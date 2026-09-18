export type Language = 'EN' | 'HI';

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  EN: {
    // Brand & Header
    'brand.name': 'SAMADHANSETU',
    'brand.tagline': 'Problem to Impact',
    'brand.subtitle': 'Smart India Hackathon 2026 Innovation Ecosystem',

    // Navigation & Common
    'nav.search_placeholder': 'Search challenges, districts, categories...',
    'nav.portal_login': 'PORTAL LOGIN',
    'nav.notifications': 'Notifications',
    'nav.unread': 'unread',
    'nav.sign_in': 'Sign In',
    'nav.sign_out': 'Sign Out',
    'nav.dark_mode': 'Dark Mode',
    'nav.light_mode': 'Light Mode',
    'nav.language': 'Language',
    'nav.switch_role': 'Switch Portal',
    'nav.mark_all_read': 'Mark all as read',

    // Demo bar
    'demo.badge': 'SIH 2026 DEMO MODE',
    'demo.active_role': 'Active Role',
    'demo.golden_tour': 'Interactive Golden Tour',
    'demo.reset': 'Reset Demo',
    'demo.step': 'Step',
    'demo.quick_switch': 'Quick Role Switch:',

    // Sidebar Links
    'side.problem_to_impact': 'Problem to Impact',
    'side.active_view': 'Active View',
    'side.overview': 'Overview',
    'side.explore_challenges': 'Explore Challenges',
    'side.solutions': 'Impact Showcase',
    'side.how_it_works': 'How Ecosystem Works',
    'side.verify_credential': 'Verify Credential',
    'side.command_center': 'Command Center',
    'side.verification_queue': 'Incoming & Duplicate Queue',
    'side.live_gis_map': 'Live GIS Problem Map',
    'side.challenges_registry': 'Challenges Registry',
    'side.impact_desk': 'Impact Verification Desk',
    'side.analytics': 'Geographic Analytics',
    'side.audit_log': 'Transparent Audit Log',
    'side.citizen_dashboard': 'Citizen Dashboard',
    'side.report_problem': 'Report a Problem',
    'side.my_reports': 'My Submissions & Tracking',
    'side.university_dashboard': 'Innovation Dashboard',
    'side.recommended_challenges': 'Recommended Challenges',
    'side.active_projects': 'Active Projects & Milestones',
    'side.student_profile': 'Student Impact Profile',
    'side.mentor_review': 'Proposal Review Desk',
    'side.supervised_teams': 'Supervised Student Teams',
    'side.csr_portfolio': 'CSR Portfolio & Impact',
    'side.discover_projects': 'Discover University Projects',
    'side.field_ops': 'Field Operations Desk',
    'side.submit_evidence': 'Submit Field Evidence',
    'side.incident_map': 'Ground Incident Map',

    // Roles
    'role.government': 'District & State Government',
    'role.citizen': 'Citizens & Communities',
    'role.student': 'Universities & Students',
    'role.mentor': 'Faculty Academic Mentors',
    'role.industry': 'Industry & Corporate CSR',
    'role.ngo': 'NGOs & Field Implementers',

    // Statuses
    'status.unverified': 'Unverified',
    'status.verified': 'Verified',
    'status.published': 'Published',
    'status.adopted': 'Adopted',
    'status.in_progress': 'In Progress',
    'status.implementation': 'Implementation',
    'status.impact_verification': 'Impact Verification',
    'status.resolved': 'Resolved',

    // Priorities
    'priority.critical': 'CRITICAL',
    'priority.high': 'HIGH',
    'priority.medium': 'MEDIUM',
    'priority.low': 'LOW',

    // Hero Section
    'hero.tag': 'Smart India Hackathon 2026 Innovation Platform',
    'hero.title_prefix': 'Bridging Civic Problems with',
    'hero.title_highlight': 'Engineered, Funded & Verified Solutions.',
    'hero.desc': 'SamadhanSetu (समाधान सेतु) turns verified community problems into accredited University Capstone projects, funded by Corporate CSR grants, deployed with grassroots NGOs, and audited by District Administration.',
    'hero.btn_explore': 'Explore Challenges',
    'hero.btn_report': 'Report a Problem',
    'hero.btn_tour': 'Start Guided Golden Tour',

    // Stats
    'stats.total_reports': 'Total Reports',
    'stats.total_reports_sub': 'Citizen submissions',
    'stats.verified': 'Verified / Active',
    'stats.verified_sub': 'Published challenges',
    'stats.critical': 'Critical Priority',
    'stats.critical_sub': 'Score > 85 threshold',
    'stats.teams': 'University Teams',
    'stats.teams_sub': 'Active capstone projects',
    'stats.resolved': 'Verified Impact',
    'stats.resolved_sub': 'Tamper-proof credentials',

    // Common Actions
    'action.submit': 'Submit',
    'action.cancel': 'Cancel',
    'action.close': 'Close',
    'action.verify': 'Verify',
    'action.approve': 'Approve',
    'action.filter': 'Filters',
    'action.all': 'All',
    'action.view_details': 'View Details',
    'action.back': 'Back',
    'action.search': 'Search',
    'action.loading': 'Loading...',
    'action.save': 'Save',

    // Footer
    'footer.org': 'Government-Academic-Community Nexus',
    'footer.prototype': 'Simulated Live Prototype',
  },

  HI: {
    // Brand & Header
    'brand.name': 'समाधान सेतु',
    'brand.tagline': 'समस्या से समाधान तक',
    'brand.subtitle': 'स्मार्ट इंडिया हैकथॉन 2026 नवाचार मंच',

    // Navigation & Common
    'nav.search_placeholder': 'समस्याएं, जिले, श्रेणियां खोजें...',
    'nav.portal_login': 'पोर्टल लॉगिन',
    'nav.notifications': 'सूचनाएं',
    'nav.unread': 'अपठित',
    'nav.sign_in': 'लॉग इन',
    'nav.sign_out': 'लॉग आउट',
    'nav.dark_mode': 'डार्क मोड',
    'nav.light_mode': 'लाइट मोड',
    'nav.language': 'भाषा',
    'nav.switch_role': 'पोर्टल बदलें',
    'nav.mark_all_read': 'सभी को पढ़ा हुआ चिह्नित करें',

    // Demo bar
    'demo.badge': 'एस.आई.एच 2026 डेमो मोड',
    'demo.active_role': 'सक्रिय भूमिका',
    'demo.golden_tour': 'इंटरएक्टिव गोल्डन टूर',
    'demo.reset': 'डेमो रीसेट',
    'demo.step': 'चरण',
    'demo.quick_switch': 'त्वरित भूमिका परिवर्तन:',

    // Sidebar Links
    'side.problem_to_impact': 'समस्या से समाधान तक',
    'side.active_view': 'सक्रिय दृश्य',
    'side.overview': 'मुख्य पृष्ठ',
    'side.explore_challenges': 'नागरिक चुनौतियाँ देखें',
    'side.solutions': 'सफल समाधान व प्रभाव',
    'side.how_it_works': 'प्रणाली कैसे काम करती है',
    'side.verify_credential': 'प्रमाणपत्र सत्यापन',
    'side.command_center': 'सरकारी कमान केंद्र',
    'side.verification_queue': 'आगामी व डुप्लिकेट कतार',
    'side.live_gis_map': 'लाइव जीआईएस मानचित्र',
    'side.challenges_registry': 'चुनौती पंजिका',
    'side.impact_desk': 'प्रभाव सत्यापन डेस्क',
    'side.analytics': 'भौगोलिक विश्लेषण',
    'side.audit_log': 'पारदर्शी ऑडिट लॉग',
    'side.citizen_dashboard': 'नागरिक डैशबोर्ड',
    'side.report_problem': 'समस्या दर्ज करें',
    'side.my_reports': 'मेरी शिकायतें व ट्रैकिंग',
    'side.university_dashboard': 'नवाचार डैशबोर्ड',
    'side.recommended_challenges': 'अनुशंसित चुनौतियाँ',
    'side.active_projects': 'सक्रिय परियोजनाएं व मील के पत्थर',
    'side.student_profile': 'छात्र प्रभाव प्रोफ़ाइल',
    'side.mentor_review': 'प्रस्ताव समीक्षा डेस्क',
    'side.supervised_teams': 'निर्देशित छात्र टीमें',
    'side.csr_portfolio': 'सीएसआर पोर्टफोलियो व प्रभाव',
    'side.discover_projects': 'विश्वविद्यालय परियोजनाएं खोजें',
    'side.field_ops': 'क्षेत्रीय संचालन डेस्क',
    'side.submit_evidence': 'क्षेत्रीय साक्ष्य जमा करें',
    'side.incident_map': 'क्षेत्रीय घटना मानचित्र',

    // Roles
    'role.government': 'जिला एवं राज्य प्रशासन',
    'role.citizen': 'नागरिक एवं समुदाय',
    'role.student': 'विश्वविद्यालय एवं छात्र',
    'role.mentor': 'संकाय शैक्षणिक संरक्षक (मेंटर)',
    'role.industry': 'उद्योग एवं कॉर्पोरेट सीएसआर',
    'role.ngo': 'गैर-सरकारी संगठन एवं क्षेत्रीय साथी',

    // Statuses
    'status.unverified': 'असत्यापित',
    'status.verified': 'सत्यापित',
    'status.published': 'प्रकाशित',
    'status.adopted': 'स्वीकृत',
    'status.in_progress': 'प्रगति पर',
    'status.implementation': 'कार्यान्वयन',
    'status.impact_verification': 'प्रभाव सत्यापन',
    'status.resolved': 'समाधान पूर्ण',

    // Priorities
    'priority.critical': 'अत्यंत गंभीर',
    'priority.high': 'उच्च',
    'priority.medium': 'मध्यम',
    'priority.low': 'सामान्य',

    // Hero Section
    'hero.tag': 'स्मार्ट इंडिया हैकथॉन 2026 नवाचार मंच',
    'hero.title_prefix': 'नागरिक समस्याओं को जोड़ना',
    'hero.title_highlight': 'अभियांत्रित, वित्तपोषित व सत्यापित समाधानों से।',
    'hero.desc': 'समाधान सेतु (SamadhanSetu) समुदाय की वास्तविक समस्याओं को मान्यता प्राप्त विश्वविद्यालय इंजीनियरिंग प्रोजेक्ट्स में बदलता है, जिन्हें कॉर्पोरेट सीएसआर अनुदान मिलता है, ज़मीनी एनजीओ द्वारा लागू किया जाता है और जिला प्रशासन द्वारा प्रमाणित किया जाता है।',
    'hero.btn_explore': 'चुनौतियाँ देखें',
    'hero.btn_report': 'समस्या दर्ज करें',
    'hero.btn_tour': 'गाइडेड गोल्डन टूर शुरू करें',

    // Stats
    'stats.total_reports': 'कुल शिकायतें',
    'stats.total_reports_sub': 'नागरिक प्रविष्टियाँ',
    'stats.verified': 'सत्यापित / सक्रिय',
    'stats.verified_sub': 'प्रकाशित चुनौतियाँ',
    'stats.critical': 'अत्यंत गंभीर',
    'stats.critical_sub': 'स्कोर > 85 सीमा',
    'stats.teams': 'विश्वविद्यालय टीमें',
    'stats.teams_sub': 'सक्रिय कैपस्टोन प्रोजेक्ट्स',
    'stats.resolved': 'सत्यापित प्रभाव',
    'stats.resolved_sub': 'अपरिवर्तनीय डिजिटल प्रमाण',

    // Common Actions
    'action.submit': 'जमा करें',
    'action.cancel': 'रद्द करें',
    'action.close': 'बंद करें',
    'action.verify': 'सत्यापित करें',
    'action.approve': 'स्वीकृत करें',
    'action.filter': 'फ़िल्टर',
    'action.all': 'सभी',
    'action.view_details': 'विवरण देखें',
    'action.back': 'पीछे जाएं',
    'action.search': 'खोजें',
    'action.loading': 'लोड हो रहा है...',
    'action.save': 'सुरक्षित करें',

    // Footer
    'footer.org': 'शासन-शिक्षा-समुदाय समन्वय',
    'footer.prototype': 'लाइव प्रोटोटाइप सिमुलेशन',
  }
};

export function translate(key: string, lang: Language, fallback?: string): string {
  const dict = TRANSLATIONS[lang];
  if (dict && dict[key]) {
    return dict[key];
  }
  const enDict = TRANSLATIONS.EN;
  if (enDict && enDict[key]) {
    return enDict[key];
  }
  return fallback || key;
}
