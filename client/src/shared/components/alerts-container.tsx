import { ReactNode, useEffect } from 'react';
import {
  AiOutlineCheckCircle,
  AiOutlineClose,
  AiOutlineInfoCircle,
  AiOutlineStop,
} from 'react-icons/ai';

import { useAlerts } from '../hooks';
import { AlertVariant } from '../types';
import { Button, Typograpghy } from '../ui';
import Portal from '../ui/portal';

export const AlertsContainer = () => {
  const { alerts, removeAlert } = useAlerts();

  const icons: Record<AlertVariant, ReactNode> = {
    info: <AiOutlineInfoCircle size={28} className="text-primary-200" />,
    success: <AiOutlineCheckCircle size={28} className="text-primary-200" />,
    error: <AiOutlineStop size={28} className="text-red" />,
  };

  return (
    <Portal targetId="portals-root">
      <div className="fixed top-3 left-[41%] z-50">
        <ul className="flex flex-col space-y-2">
          {alerts.map((alert) => (
            <AlertItem
              text={alert.text}
              title={alert.title}
              icon={icons[alert.variant]}
              onRemove={() => removeAlert(alert)}
              key={alert.id}
            />
          ))}
        </ul>
      </div>
    </Portal>
  );
};

type AlertItemProps = {
  text: string;
  icon?: ReactNode;
  title?: string;
  autoClose?: number;
  onRemove: () => void;
};

const AlertItem = ({ text, icon, title, autoClose = 3000, onRemove }: Readonly<AlertItemProps>) => {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(), autoClose);

    return () => clearTimeout(timer);
  }, []);

  return (
    <li className="bg-secondary-100 inline-flex w-96 gap-3 rounded-2xl px-4 py-3 shadow-md">
      {icon}
      <div className="flex-1">
        <Typograpghy tagVariant="h4">{title}</Typograpghy>
        <Typograpghy>{text}</Typograpghy>
      </div>
      <Button variant="text" onClick={onRemove}>
        <AiOutlineClose size={24} />
      </Button>
    </li>
  );
};
