import { Outlet } from 'react-router-dom';
import ChatNavbar from '../components/chat-navbar';
import Sidebar from '../components/sidebar';

export default function ChatLayout() {
  return (
    <>
      <ChatNavbar></ChatNavbar>

      <div className="flex flex-1 max-h-[calc(100vh-3.3rem)] relative overflow-y-auto">
        <Sidebar></Sidebar>
        <Outlet></Outlet>
      </div>
    </>
  );
}
