import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import { authUtils } from '../../utils/auth';

interface DashboardLayoutProps {
  title: string;
  subtitle?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ title, subtitle }) => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  useEffect(() => {
    // Check authentication on mount and redirect if not authenticated
    if (!authUtils.isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  // Show loading or redirect if not authenticated
  if (!authUtils.isAuthenticated()) {
    return (
      <div className="min-h-screen bg-[#E8DDD4] flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-16 h-16 border-4 border-[#C4A173] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#4D361E] text-lg font-medium">Checking authentication...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#f8f6f3] flex overflow-hidden">
      {/* Fixed Sidebar */}
      <DashboardSidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col h-screen ${
        sidebarCollapsed 
          ? 'ml-0 lg:ml-16' 
          : 'ml-0 lg:ml-64'
      }`}>
        {/* Fixed Header */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <DashboardHeader 
            title={title} 
            subtitle={subtitle} 
            onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto bg-[#f8f6f3]">
          <motion.div
            className="p-4 md:p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {!sidebarCollapsed && (
        <motion.div
          className="fixed inset-0 backdrop-blur-sm bg-black/20 z-20 lg:hidden"
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;