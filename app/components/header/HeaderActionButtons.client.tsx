import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { workbenchStore } from '~/lib/stores/workbench';
import { DeployButton } from '~/components/deploy/DeployButton';
import WithTooltip from '~/components/ui/Tooltip';

interface HeaderActionButtonsProps {
  chatStarted: boolean;
}

export function HeaderActionButtons({ chatStarted: _chatStarted }: HeaderActionButtonsProps) {
  const [activePreviewIndex] = useState(0);
  const previews = useStore(workbenchStore.previews);
  const activePreview = previews[activePreviewIndex];

  const shouldShowButtons = activePreview;

  return (
    <div className="flex items-center gap-1">
      {/* Deploy Button */}
      {shouldShowButtons && <DeployButton />}

      {/* Debug Tools */}
      {shouldShowButtons && (
        <div className="flex border border-bolt-elements-borderColor rounded-md overflow-hidden text-sm">
          <WithTooltip tooltip="Report Bug">
            <button
              onClick={() =>
                window.open('https://github.com/stackblitz-labs/bolt.diy/issues/new?template=bug_report.yml', '_blank')
              }
              className="rounded-l-md items-center justify-center [&:is(:disabled,.disabled)]:cursor-not-allowed [&:is(:disabled,.disabled)]:opacity-60 px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors outline-[var(--primary)] flex gap-1.5"
            >
              <div className="i-ph:bug" />
              <span>Report Bug</span>
            </button>
          </WithTooltip>
          <div className="w-px bg-gray-200 dark:bg-gray-700" />
          <WithTooltip tooltip="Download Debug Log">
            <button
              onClick={async () => {
                try {
                  const { downloadDebugLog } = await import('~/utils/debugLogger');
                  await downloadDebugLog();
                } catch (error) {
                  console.error('Failed to download debug log:', error);
                }
              }}
              className="rounded-r-md items-center justify-center [&:is(:disabled,.disabled)]:cursor-not-allowed [&:is(:disabled,.disabled)]:opacity-60 px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors outline-[var(--primary)] flex gap-1.5"
            >
              <div className="i-ph:download" />
              <span>Debug Log</span>
            </button>
          </WithTooltip>
        </div>
      )}
    </div>
  );
}

