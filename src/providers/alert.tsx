'use client';

import React, {
  type ComponentPropsWithRef,
  createContext,
  memo,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { CircleAlert, CircleCheckBig } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { cn } from '@/lib/utils';

export interface AlertActionsProps {
  confirm: () => void;
  cancel: () => void;
  config: AlertOptions;
  setConfig: ConfigUpdater;
}

export type ConfigUpdater = (
  _config: AlertOptions | ((_prev: AlertOptions) => AlertOptions),
) => void;

export type LegacyAlertActions = (
  _onConfirm: () => void,
  _onCancel: () => void,
) => ReactNode;

export type EnhancedAlertActions = (_props: AlertActionsProps) => ReactNode;

export interface AlertOptions {
  title?: ReactNode;
  description?: ReactNode;
  contentSlot?: ReactNode;

  // Icons
  icon?: string;
  iconClassName?: string;

  // Alert Dialog
  alertDialogContent?: ComponentPropsWithRef<typeof AlertDialogContent>;
  alertDialogHeader?: ComponentPropsWithRef<typeof AlertDialogHeader>;
  alertDialogTitle?: ComponentPropsWithRef<typeof AlertDialogTitle>;
  alertDialogDescription?: ComponentPropsWithRef<typeof AlertDialogDescription>;
  alertDialogFooter?: ComponentPropsWithRef<typeof AlertDialogFooter>;

  // Buttons
  confirmText?: string;
  cancelText?: string;
  customActions?: LegacyAlertActions | EnhancedAlertActions;
  confirmButton?: ComponentPropsWithRef<typeof AlertDialogAction>;
  cancelButton?: ComponentPropsWithRef<typeof AlertDialogCancel> | null;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface ConfirmDialogState {
  isOpen: boolean;
  config: AlertOptions;
  resolver: ((_value: boolean) => void) | null;
}

export interface AlertContextValue {
  confirm: AlertFunction;
  updateConfig: ConfigUpdater;
}

export interface AlertFunction {
  (_options: AlertOptions): Promise<boolean>;
  updateConfig?: ConfigUpdater;
}

const AlertContext = createContext<AlertContextValue | undefined>(undefined);

interface IAlertContent {
  config: AlertOptions;
  onConfirm: () => void;
  onCancel: () => void;
  setConfig: ConfigUpdater;
}

const baseDefaultOptions: AlertOptions = {
  title: '',
  description: '',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  icon: 'error',
  iconClassName: '',
  confirmButton: {},
  cancelButton: {},
};

function isLegacyCustomActions(
  fn: LegacyAlertActions | EnhancedAlertActions,
): fn is LegacyAlertActions {
  return fn.length === 2;
}

const AlertContent: React.FC<IAlertContent> = memo(
  ({ config, onConfirm, onCancel, setConfig }) => {
    const {
      title,
      description,
      cancelButton,
      confirmButton,
      confirmText,
      cancelText,
      icon,
      iconClassName,
      contentSlot,
      customActions,
      alertDialogContent,
      alertDialogHeader,
      alertDialogTitle,
      alertDialogDescription,
      alertDialogFooter,
      onCancel: onCancelProp,
      onConfirm: onConfirmProp,
    } = config;

    const renderActions = () => {
      if (!customActions) {
        return (
          <>
            {cancelButton !== null && (
              <AlertDialogCancel
                onClick={async () => {
                  await Promise.resolve(onCancel).then(onCancelProp);
                }}
                {...cancelButton}
              >
                {cancelText}
              </AlertDialogCancel>
            )}
            <AlertDialogAction
              onClick={async () =>
                await Promise.resolve(onConfirm).then(onConfirmProp)
              }
              {...confirmButton}
            >
              {confirmText}
            </AlertDialogAction>
          </>
        );
      }

      if (isLegacyCustomActions(customActions)) {
        return customActions(onConfirm, onCancel);
      }

      return customActions({
        confirm: onConfirm,
        cancel: onCancel,
        config,
        setConfig,
      });
    };

    const renderIcon = useMemo(() => {
      if (typeof icon === 'string') {
        switch (icon) {
          case 'error':
            return (
              <CircleAlert
                className={cn('size-10 shrink-0 text-red-500', iconClassName)}
              />
            );
          case 'success':
            return (
              <CircleCheckBig
                className={cn('size-10 shrink-0 text-green-500', iconClassName)}
              />
            );
          default:
            return null;
        }
      }

      return icon;
    }, [icon, iconClassName]);

    return (
      <AlertDialogContent
        id="alert-dialog"
        aria-describedby={description ? 'alert-dialog-description' : undefined}
        {...alertDialogContent}
      >
        <AlertDialogHeader {...alertDialogHeader} className="mb-6 py-0">
          {icon && (
            <span className="mb-5 flex-center w-full">{renderIcon}</span>
          )}
          {title && (
            <AlertDialogTitle {...alertDialogTitle}>
              {title ?? description}
            </AlertDialogTitle>
          )}
          {description && (
            <AlertDialogDescription
              id="alert-dialog-description"
              {...alertDialogDescription}
              className="mt-1 text-center"
            >
              {description ?? title}
            </AlertDialogDescription>
          )}
          {contentSlot}
        </AlertDialogHeader>
        <AlertDialogFooter {...alertDialogFooter}>
          {renderActions()}
        </AlertDialogFooter>
      </AlertDialogContent>
    );
  },
);

AlertContent.displayName = 'AlertContent';

const Alert: React.FC<{
  isOpen: boolean;
  onOpenChange: (_isOpen: boolean) => void;
  config: AlertOptions;
  onConfirm: () => void;
  onCancel: () => void;
  setConfig: ConfigUpdater;
}> = memo(
  ({ isOpen, onOpenChange, config, onConfirm, onCancel, setConfig }) => (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertContent
        config={config}
        onConfirm={onConfirm}
        onCancel={onCancel}
        setConfig={setConfig}
      />
    </AlertDialog>
  ),
);

Alert.displayName = 'Alert';

// Provider
const AlertProvider: React.FC<{
  defaultOptions?: AlertOptions;
  children: React.ReactNode;
}> = ({ defaultOptions = {}, children }) => {
  const [dialogState, setDialogState] = useState<ConfirmDialogState>({
    isOpen: false,
    config: baseDefaultOptions,
    resolver: null,
  });

  const mergedDefaultOptions = useMemo(
    () => ({
      ...baseDefaultOptions,
      ...defaultOptions,
    }),
    [defaultOptions],
  );

  const updateConfig = useCallback(
    (newConfig: AlertOptions | ((_prev: AlertOptions) => AlertOptions)) => {
      setDialogState((prev) => ({
        ...prev,
        config:
          typeof newConfig === 'function'
            ? newConfig(prev.config)
            : { ...prev.config, ...newConfig },
      }));
    },
    [],
  );

  const confirm = useCallback(
    (options: AlertOptions) => {
      setDialogState((prev) => ({
        isOpen: true,
        config: { ...mergedDefaultOptions, ...options },
        resolver: prev.resolver,
      }));
      return new Promise<boolean>((resolve) => {
        setDialogState((prev) => ({
          ...prev,
          resolver: resolve,
        }));
      });
    },
    [mergedDefaultOptions],
  );

  const handleConfirm = useCallback(() => {
    setDialogState((prev) => {
      if (prev.resolver) {
        prev.resolver(true);
      }
      return {
        ...prev,
        isOpen: false,
        resolver: null,
      };
    });
  }, []);

  const handleCancel = useCallback(() => {
    setDialogState((prev) => {
      if (prev.resolver) {
        prev.resolver(false);
      }
      return {
        ...prev,
        isOpen: false,
        resolver: null,
      };
    });
  }, []);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        handleCancel();
      }
    },
    [handleCancel],
  );

  const contextValue = useMemo(
    () => ({
      confirm,
      updateConfig,
    }),
    [confirm, updateConfig],
  );

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
      <Alert
        isOpen={dialogState.isOpen}
        onOpenChange={handleOpenChange}
        config={dialogState.config}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        setConfig={updateConfig}
      />
    </AlertContext.Provider>
  );
};

// Hook
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }

  const { confirm, updateConfig } = context;

  const enhancedConfirm = confirm;
  enhancedConfirm.updateConfig = updateConfig;

  return enhancedConfirm as AlertFunction & {
    updateConfig: AlertContextValue['updateConfig'];
  };
};

export default AlertProvider;
