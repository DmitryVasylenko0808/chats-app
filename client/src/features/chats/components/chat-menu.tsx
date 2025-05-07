import { useToogleMenu } from '@/shared/hooks';
import { Button, Menu } from '@/shared/ui';
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid';

type ChatMenuProps = { chatId: number };

export const ChatMenu = ({ chatId }: Readonly<ChatMenuProps>) => {
  const { handleToggle, open, ref } = useToogleMenu();

  return (
    <Menu
      trigger={
        <Button variant="text" onClick={handleToggle}>
          <EllipsisVerticalIcon width={24} height={24} />
        </Button>
      }
      content={<div>Content</div>}
      open={open}
      ref={ref}
    />
  );
};
