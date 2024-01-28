import { useSelector } from 'react-redux';
import { allEvents } from '@/app/redux/events/eventsSelectors';
import { downloadJsonFile } from '../helpers/downloadJsonFile';
import { userId } from '@/app/redux/user/userSelectors';

export const DownloadButton = () => {
  const reduxData: IEvent[] = useSelector(allEvents);
  const id = useSelector(userId);

  const handleDownload = () => {
    downloadJsonFile(reduxData, id);
  };

  return (
    <div>
      <button
        className="hover:underline text-border text-main mb-[80px]"
        onClick={handleDownload}
      >
        Click to download JSON
      </button>
    </div>
  );
};
