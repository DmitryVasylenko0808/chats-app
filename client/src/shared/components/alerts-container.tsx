import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/16/solid';

import { ReactNode, useEffect } from 'react';

import { useAlerts } from '../hooks';
import { AlertVariant } from '../types';
import { Button } from '../ui';

export const AlertsContainer = () => {
  const { alerts, removeAlert } = useAlerts();

  const icons: Record<AlertVariant, ReactNode> = {
    info: <InformationCircleIcon width={28} height={28} className="text-primary" />,
    success: <CheckCircleIcon width={28} height={28} className="text-primary" />,
    error: <ExclamationCircleIcon width={28} height={28} className="text-red" />,
  };

  return (
    <div className="fixed top-3 left-[41%] z-40">
      <ul className="flex flex-col space-y-2">
        {alerts.map((alert) => (
          <AlertItem
            text={alert.text}
            icon={icons[alert.variant]}
            onRemove={() => removeAlert(alert)}
            key={alert.id}
          />
        ))}
      </ul>
    </div>
  );
};

type AlertItemProps = {
  text: string;
  icon?: ReactNode;
  title?: string;
  autoClose?: number;
  onRemove: () => void;
};

const AlertItem = ({ text, icon, title, autoClose = 5000, onRemove }: Readonly<AlertItemProps>) => {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(), autoClose);

    return () => clearTimeout(timer);
  }, []);

  return (
    <li className="inline-flex w-96 gap-3 rounded-2xl bg-white px-4 py-3 shadow-md">
      {icon}
      <div className="flex-1">
        <h3 className="">{title}</h3>
        <p className="text-body">{text}</p>
      </div>
      <Button variant="text" onClick={onRemove}>
        <XMarkIcon width={24} height={24} />
      </Button>
    </li>
  );
};
