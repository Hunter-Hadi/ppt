import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import React, { FC, useMemo } from 'react';

import { MAXAI_CHROME_EXTENSION_APP_HOMEPAGE_URL } from '@/features/common/constants';
import useFavoritePrompts from '@/features/prompt_library/hooks/useFavoritePrompts';
import usePromptActions from '@/features/prompt_library/hooks/usePromptActions';
import usePromptLibraryAuth from '@/features/prompt_library/hooks/usePromptLibraryAuth';

export const FavoriteIconButton: FC<{
  promptId: string;
}> = ({ promptId }) => {
  const { addFavoritePromptMutation, removeFavoritePromptMutation } =
    usePromptActions();
  const { checkMaxAIChromeExtensionInstall, checkAuthSync } =
    usePromptLibraryAuth();
  const { data } = useFavoritePrompts();
  const favouritePromptIds = useMemo(() => {
    return (data || []).map((prompt) => prompt.id);
  }, [data]);
  const isFavorite = useMemo(
    () => favouritePromptIds.includes(promptId),
    [favouritePromptIds, promptId],
  );

  const iconSx = useMemo(
    () => ({
      fontSize: 16,
    }),
    [],
  );

  const Icon = useMemo(
    () =>
      isFavorite ? (
        <FavoriteOutlinedIcon sx={iconSx} />
      ) : (
        <FavoriteBorderOutlinedIcon sx={iconSx} />
      ),
    [isFavorite, iconSx],
  );

  const tooltipTitle = useMemo(
    () => (isFavorite ? 'Remove from Favorites' : 'Add to Favorites'),
    [isFavorite],
  );

  const buttonCom = (
    <IconButton
      size='small'
      onClick={async (event) => {
        event.stopPropagation();
        if (await checkMaxAIChromeExtensionInstall()) {
          if (await checkAuthSync()) {
            if (isFavorite) {
              removeFavoritePromptMutation.mutate(promptId);
            } else {
              addFavoritePromptMutation.mutate(promptId);
            }
          } else {
            window.location.href = `${MAXAI_CHROME_EXTENSION_APP_HOMEPAGE_URL}/prompts?favoritesId=${promptId}`;
          }
        }
      }}
    >
      {addFavoritePromptMutation.isPending ||
      removeFavoritePromptMutation.isPending ? (
        <CircularProgress size={16} />
      ) : (
        <Tooltip title={tooltipTitle}>{Icon}</Tooltip>
      )}
    </IconButton>
  );

  return <>{buttonCom}</>;
};
