export const monitorGlobalClickEvents = (
  topWrapRef: React.MutableRefObject<HTMLElement | null>,
  closeOpenAllPopup: () => void,
) => {
  const handleClickOutside = (event) => {
    if (
      topWrapRef.current &&
      !topWrapRef.current.contains(event.target) &&
      !event.target.closest('.functionality-sign-pdf-object-tools-popup') &&
      !event.target.closest('.MuiPopover-paper') &&
      !event.target.closest('.functionality-sign-pdf-save-view') //不知道为什么，这个点击事件触发两次才有效，所以加了这个
    ) {
      // 点击发生在Box组件外部
      closeOpenAllPopup()
    }
  }
  document.addEventListener('mousedown', handleClickOutside)
  document.addEventListener('touchstart', handleClickOutside)

  const handleScroll = () => {
    //监听窗口滚动，关闭菜单
    //因为做跟随窗口滚动的菜单，功能比较复杂，目前还没有必要
    closeOpenAllPopup()
  }
  window.addEventListener('scroll', handleScroll)
  return () => {
    document.removeEventListener('mousedown', handleClickOutside)
    document.removeEventListener('touchstart', handleClickOutside)
    window.removeEventListener('scroll', handleScroll)
  }
}
