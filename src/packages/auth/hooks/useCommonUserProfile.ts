import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useMemo } from 'react';
import { useRecoilState } from 'recoil';
dayjs.extend(utc);

import {
  COMMON_AUTH_API_HOST,
  USER_ROLE_PRIORITY,
} from '@/packages/auth/constants';
import { UserProfileState } from '@/packages/auth/store';
import {
  checkPayingUser,
  getAccessToken,
  renderRoleName,
} from '@/packages/auth/utils';

import { IUserInfoApiResponse, IUserProfile, IUserRoleType } from '../types';

// TODO: 功能type
type RENDER_PLAN_TYPE =
  | 'free' // 免费版
  | 'basic' // basic 月付 个人版
  | 'basic_yearly' // basic 年付 个人版
  | 'basic_team' // basic 月付 团队版
  | 'basic_one_year' // basic 一年版
  | 'pro' // pro 月付 个人版
  | 'pro_yearly' // pro 年付 个人版
  | 'pro_one_year' // pro 一年版
  | 'pro_team' // pro 月付 团队版
  | 'elite' // elite 月付 个人版
  | 'elite_yearly' // elite 年付 个人版
  | 'elite_one_year' // elite 一年版
  | 'elite_team'; // elite 月付 team 版本

export const useCommonUserProfile = () => {
  const [userProfileState, setUserProfile] = useRecoilState(UserProfileState);
  const { user: userProfile, loading } = userProfileState;

  const { name: roleName, expireTimeStr } = userProfile?.role || {
    name: 'free',
    expireTimeStr: '',
  };

  const syncUserInfo = async () => {
    try {
      setUserProfile((pre) => ({ ...pre, loading: true }));
      const response = await fetch(
        COMMON_AUTH_API_HOST + '/user/get_user_info',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAccessToken()}`,
          },
        },
      );
      const result: {
        status: string;
        data: IUserInfoApiResponse;
      } = await response.json();
      if (result.status === 'OK' && result.data?.email) {
        const userStore: IUserProfile = {
          ...result.data,
          role: {
            name: 'free',
            expireTimeStr: '',
          },
        };

        if (userStore.roles.length > 0) {
          const format = 'MMM D, YYYY';

          // 将 data.roles.name 根据 USER_ROLE_PRIORITY  优先级排序，最大的在第一个
          const sortedRoles = userStore.roles.sort((a, b) => {
            return (
              (USER_ROLE_PRIORITY[b.name as IUserRoleType] || 0) -
              (USER_ROLE_PRIORITY[a.name as IUserRoleType] || 0)
            );
          });

          const { exp_time } = sortedRoles[0];
          let planType = sortedRoles[0].name;
          // 这里需要处理一下，因为有可能是 pro_team, elite_team 这种类型
          planType = planType.includes('_')
            ? (planType.split('_')[0] as IUserRoleType)
            : planType;

          const expireTime = dayjs(exp_time).utc().valueOf();
          const now = dayjs().utc().valueOf();
          if (planType !== 'free' && expireTime - now > 0) {
            let expireTimeStr = dayjs(exp_time).format(format);
            // 如果不是订阅类型，到期时间需要取另一个字段
            if (userStore.subscription_type !== 'SUBSCRIPTION') {
              expireTimeStr = userStore.current_period_end
                ? // current_period_end 是 unix 时间戳，需要转换成毫秒
                  dayjs.utc(userStore.current_period_end * 1000).format(format)
                : dayjs(exp_time).format(format);
            }
            userStore.role = {
              name: planType as IUserRoleType,
              expireTimeStr,
            };
          }
        }
        setUserProfile({
          user: userStore,
          loading: false,
        });
        // TODO: mixpanel先不加
        // if (result.data?.client_user_id) {
        //   如果后端api 返回了 client_user_id，那么将其存储到 localStorage 中
        // setClientUserId(result.data?.client_user_id);
        // }
        return result.data;
      }
      return null;
    } catch (e) {
      console.error(e);
      return null;
    } finally {
      setUserProfile((pre) => ({ ...pre, loading: false }));
    }
  };

  const currentUserRole = useMemo<IUserRoleType>(() => {
    let name: IUserRoleType = roleName;

    // 判断是否是新用户 - 14天内注册的用户
    // 判断是否是老用户 - 注册时间超过14天的用户
    if (name === 'free' && userProfile?.created_at) {
      const created_at = dayjs(userProfile?.created_at);
      const now = dayjs().utc();
      const diffDays = now.diff(created_at, 'day');
      const NEW_USER_DAYS = 14;
      if (diffDays <= NEW_USER_DAYS) {
        name = 'new_user';
      } else {
        name = 'old_free_user';
      }
    }

    return name;
  }, [roleName, userProfile?.created_at]);

  // 根据 IUserRoleType 渲染出实际要显示的 plan name text
  const currentUserRoleText = useMemo(
    () => (loading ? '' : renderRoleName(currentUserRole)),
    [loading, currentUserRole],
  );

  const returnUserProfile = useMemo(() => {
    if (userProfile) {
      return {
        ...userProfile,
        subscriptionType: userProfile?.subscription_plan_name,
        expireTimeStr,
      };
    }

    return null;
  }, [userProfile, expireTimeStr]);

  const userProfileLoading = useMemo(() => loading, [loading]);

  // 是否是付费用户
  const isPayingUser = useMemo(
    () => checkPayingUser(currentUserRole),
    [currentUserRole],
  );

  // 根据接口返回的 userProfile?.subscription_plan_name 来判断用户的订阅类型
  // 月付、年付、一次性付款、null
  const subscriptionType = useMemo<
    'monthly' | 'yearly' | 'oneTimePayment' | null
  >(() => {
    if (!userProfile?.subscription_plan_name) {
      return null;
    }

    if (userProfile?.subscription_plan_name.includes('_MONTHLY')) {
      return 'monthly';
    }

    if (userProfile?.subscription_plan_name.includes('_YEARLY')) {
      return 'yearly';
    }

    return 'oneTimePayment';
  }, [userProfile?.subscription_plan_name]);

  // 判断 是否是 一次性付款的用户
  const isPaymentOneTimeUser = useMemo(
    () =>
      subscriptionType === 'oneTimePayment' ||
      userProfile?.subscription_type === 'ONE_TIME',
    [subscriptionType, userProfile?.subscription_type],
  );

  const isTeamPlanUser = useMemo(
    () => !!userProfile?.group_id,
    [userProfile?.group_id],
  );

  // 根据 currentUserRole + subscriptionType 来得出用户的 plan
  const currentUserPlan = useMemo<RENDER_PLAN_TYPE>(() => {
    let suffix = '';
    let prefix = '';
    if (currentUserRole === 'free' || subscriptionType === null) {
      return 'free';
    }

    prefix = currentUserRole;

    if (isTeamPlanUser) {
      suffix += '_team';
    }

    if (subscriptionType === 'monthly') {
      // do nothing
      // 因为 monthly 的 render plan 就是不加后缀的
    } else if (
      subscriptionType === 'yearly' ||
      subscriptionType === 'oneTimePayment' // 一次性付款的用户也当成 年付
    ) {
      suffix = '_yearly';
    }

    return `${prefix}${suffix}` as RENDER_PLAN_TYPE;
  }, [currentUserRole, subscriptionType, isTeamPlanUser]);

  const isSubscriptionPaymentFailed = useMemo(() => {
    // subscription_payment_failed_at是空值，不显示续费失败提示
    if (!userProfile?.subscription_payment_failed_at) {
      return false;
    }
    // 判断是否显示续费失败提示
    // 当前时间距离subscription_payment_failed_at小于等于30天
    const failedAt = dayjs(userProfile.subscription_payment_failed_at * 1000);
    const diffDays = dayjs().utc().diff(failedAt, 'day');
    return diffDays <= 30;
  }, [userProfile?.subscription_payment_failed_at]);

  return {
    loading: userProfileLoading,
    currentUserRole,
    currentUserRoleText,

    email: returnUserProfile?.email,
    userProfile: returnUserProfile,
    syncUserInfo,

    // 是否是 team plan 的用户
    isTeamPlanUser,
    isPayingUser,
    isFreeUser: !isPayingUser,
    isPaymentOneTimeUser,
    isSubscriptionPaymentFailed,
    subscriptionType,

    currentUserPlan,
  };
};
