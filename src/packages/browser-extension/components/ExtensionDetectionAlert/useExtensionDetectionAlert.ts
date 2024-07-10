import { atom, useRecoilState } from 'recoil';

const ExtensionDetectionAlertOpenAtom = atom({
  key: 'ExtensionDetectionAlertOpenAtom',
  default: false,
});

const useExtensionDetectionAlert = () => {
  const [open, setOpen] = useRecoilState(ExtensionDetectionAlertOpenAtom);

  const openExtensionDetectionAlert = () => {
    setOpen(true);
  };

  const closeExtensionDetectionAlert = () => {
    setOpen(false);
  };

  return { open, openExtensionDetectionAlert, closeExtensionDetectionAlert };
};

export default useExtensionDetectionAlert;
