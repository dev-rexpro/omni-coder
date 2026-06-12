import { useStore } from '@nanostores/react';
import { netlifyConnection, fetchNetlifyStats } from '~/lib/stores/netlify';
import { chatId } from '~/lib/persistence/useChatHistory';
import WithTooltip from '~/components/ui/Tooltip';
import { useEffect } from 'react';

export function NetlifyDeploymentLink() {
  const connection = useStore(netlifyConnection);
  const currentChatId = useStore(chatId);

  useEffect(() => {
    if (connection.token && currentChatId) {
      fetchNetlifyStats(connection.token);
    }
  }, [connection.token, currentChatId]);

  const deployedSite = connection.stats?.sites?.find((site) => site.name.includes(`bolt-diy-${currentChatId}`));

  if (!deployedSite) {
    return null;
  }

  return (
    <WithTooltip tooltip={deployedSite.url}>
      <a
        href={deployedSite.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-bolt-elements-item-backgroundActive text-bolt-elements-textSecondary hover:text-[#00AD9F] z-50"
        onClick={(e) => {
          e.stopPropagation(); // This is to prevent click from bubbling up
        }}
      >
        <div className="i-ph:link w-4 h-4 hover:text-blue-400" />
      </a>
    </WithTooltip>
  );
}
