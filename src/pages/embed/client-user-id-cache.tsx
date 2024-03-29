import React from 'react';

import ClientUserIdCachePages from '@/features/track_user_interactions/components/ClientUserIdCachePages';
import { APP_PROJECT_LINK } from '@/global_constants';

const ClientUserIdCache = () => {
  return <ClientUserIdCachePages targetHost={APP_PROJECT_LINK} />;
};

export default ClientUserIdCache;
