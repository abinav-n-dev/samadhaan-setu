import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StateProvider } from './context/StateContext';
import { AppShell } from './components/layout/AppShell';

// Public pages
import { LandingPage } from './pages/public/LandingPage';
import { ExploreChallengesPage } from './pages/public/ExploreChallengesPage';
import { ChallengeDetailPage } from './pages/public/ChallengeDetailPage';
import { SolutionsPage } from './pages/public/SolutionsPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { VerifyCredentialPage } from './pages/public/VerifyCredentialPage';
import { LoginPage } from './pages/public/LoginPage';

// Citizen pages
import { CitizenDashboard } from './pages/citizen/CitizenDashboard';
import { ReportProblemWizard } from './pages/citizen/ReportProblemWizard';
import { CitizenReportsPage } from './pages/citizen/CitizenReportsPage';

// Government pages
import { GovernmentDashboard } from './pages/government/GovernmentDashboard';
import { VerificationQueuePage } from './pages/government/VerificationQueuePage';
import { GovernmentMapPage } from './pages/government/GovernmentMapPage';
import { ChallengesListPage } from './pages/government/ChallengesListPage';
import { ImpactVerificationPage } from './pages/government/ImpactVerificationPage';
import { GovernmentAnalyticsPage } from './pages/government/GovernmentAnalyticsPage';
import { AuditLogPage } from './pages/government/AuditLogPage';

// University & Student pages
import { UniversityDashboard } from './pages/university/UniversityDashboard';
import { ProjectsPage } from './pages/university/ProjectsPage';
import { MentorReviewPage } from './pages/university/MentorReviewPage';
import { StudentProfilePage } from './pages/university/StudentProfilePage';

// Industry pages
import { IndustryDashboard } from './pages/industry/IndustryDashboard';
import { ProjectDiscoveryPage } from './pages/industry/ProjectDiscoveryPage';

// NGO pages
import { NgoDashboard } from './pages/ngo/NgoDashboard';
import { FieldEvidencePage } from './pages/ngo/FieldEvidencePage';

export const App: React.FC = () => {
  return (
    <StateProvider>
      <HashRouter>
        <Routes>
          <Route element={<AppShell />}>
            {/* Public Ecosystem routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/explore" element={<ExploreChallengesPage />} />
            <Route path="/challenges/:id" element={<ChallengeDetailPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/verify/:id" element={<VerifyCredentialPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Citizen routes */}
            <Route path="/citizen" element={<CitizenDashboard />} />
            <Route path="/citizen/report" element={<ReportProblemWizard />} />
            <Route path="/citizen/reports" element={<CitizenReportsPage />} />

            {/* Government routes */}
            <Route path="/government" element={<GovernmentDashboard />} />
            <Route path="/government/verification" element={<VerificationQueuePage />} />
            <Route path="/government/map" element={<GovernmentMapPage />} />
            <Route path="/government/challenges" element={<ChallengesListPage />} />
            <Route path="/government/impact" element={<ImpactVerificationPage />} />
            <Route path="/government/analytics" element={<GovernmentAnalyticsPage />} />
            <Route path="/government/audit" element={<AuditLogPage />} />

            {/* University & Student routes */}
            <Route path="/university" element={<UniversityDashboard />} />
            <Route path="/university/challenges" element={<ExploreChallengesPage />} />
            <Route path="/university/projects" element={<ProjectsPage />} />
            <Route path="/university/mentors" element={<MentorReviewPage />} />
            <Route path="/university/achievements" element={<StudentProfilePage />} />
            <Route path="/university/profile" element={<StudentProfilePage />} />

            {/* Industry routes */}
            <Route path="/industry" element={<IndustryDashboard />} />
            <Route path="/industry/projects" element={<ProjectDiscoveryPage />} />
            <Route path="/industry/support" element={<ProjectDiscoveryPage />} />

            {/* NGO routes */}
            <Route path="/ngo" element={<NgoDashboard />} />
            <Route path="/ngo/evidence" element={<FieldEvidencePage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </StateProvider>
  );
};

export default App;

