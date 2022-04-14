// views
import OrganizationHome from "@/views/Common/OrganizationHome"

import PublicHome from "@/views/Public/PublicHome"
import PublicNewsHome from "@/views/Public/PublicNewsHome"
import PublicSubjectsHome from "@/views/Public/PublicSubjectsHome"

import CabinetHome from "@/views/Cabinet/CabinetHome"
import CabinetReportsHome from "@/views/Cabinet/CabinetReportsHome"
import CabinetLoggingHome from "@/views/Cabinet/CabinetLoggingHome"
import CabinetNotificationsAndMailingsHome from "@/views/Cabinet/CabinetNotificationsAndMailings/CabinetNotificationsAndMailingsHome"
import CabinetNotificationsAndMailings from "@/views/Cabinet/CabinetNotificationsAndMailings/CabinetNotificationsAndMailings"
import CabinetUsersHome from "@/views/Cabinet/CabinetUsersHome"
import CabinetFormsHome from "@/views/Cabinet/CabinetForms/CabinetFormsHome"
import CabinetFormsApprovalHome from "@/views/Cabinet/CabinetForms/CabinetFormsApprovalHome"
import CabinetSubjectsHome from "@/views/Cabinet/CabinetSubjectsHome"
import CabinetListenersHome from "@/views/Cabinet/CabinetListenersHome"
import CabinetOrganizationEditHome from "@/views/Cabinet/CabinetOrganizationEditHome"
import CabinetNewOrganizationHome from "@/views/Cabinet/CabinetNewOrganizationHome"
import CabinetNewsHome from "@/views/Cabinet/CabinetNewsHome"

import Regions from "@/pages/Common/Regions"

// components
import Main from "@/pages/Public/Main"
import Auth from "@/pages/Public/Auth"
import News from "@/pages/Public/News"
import NewsDetail from "@/pages/Public/NewsDetail"
import NotFounded from "@/pages/Public/NotFounded"
import RegionsDetail from "@/pages/Public/Subjects/RegionDetail"
import Organization from "@/pages/Public/Subjects/Organization"
import Registration from "@/pages/Public/Registration"

import CabinetProfile from "@/pages/Cabinet/CabinetProfile"
import CabinetMap from "@/pages/Cabinet/CabinetMap"
import CabinetRegionDetail from "@/pages/Cabinet/CabinetSubjects/CabinetRegionDetail"
import CabinetOrganizationDetail from "@/pages/Cabinet/CabinetSubjects/CabinetOrganizationDetail"
import CabinetHistoryRequests from "@/pages/Cabinet/CabinetReports/CabinetHistoryRequests"
import CabinetTemplates from "@/pages/Cabinet/CabinetReports/CabinetTemplates"
import CabinetReportsAll from "@/pages/Cabinet/CabinetReports/CabinetReportsAll"
import CabinetListenersStat from "@/pages/Cabinet/CabinetListeners/CabinetListenersStat"
import CabinetNewListener from "@/pages/Cabinet/CabinetListeners/CabinetNewListener"
import CabinetListeners from "@/pages/Cabinet/CabinetListeners/CabinetListeners"
import CabinetRegionListeners from "@/pages/Cabinet/CabinetListeners/CabinetRegionListeners"
import CabinetNotifications from "@/pages/Cabinet/CabinetNotifications"
import CabinetAddNewsPage from "@/pages/Cabinet/CabinetNews/CabinetAddNewsPage"
import CabinetNews from "@/pages/Cabinet/CabinetNews/CabinetNews"
import CabinetEditNews from "@/pages/Cabinet/CabinetNews/CabinetEditNews"
import CabinetForms from "@/pages/Cabinet/CabinetForms/CabinetForms"
import CabinetFormDetail from "@/pages/Cabinet/CabinetForms/CabinetFormDetail/CabinetFormDetail"
import CabinetUsers from "@/pages/Cabinet/CabinetUsers/CabinetUsers"
import CabinetLoggingLogins from "@/pages/Cabinet/CabinetLogging/CabinetLoggingLogins"
import CabinetLoggingForms from "@/pages/Cabinet/CabinetLogging/CabinetLoggingForms"
import CabinetLoggingStatistics from "@/pages/Cabinet/CabinetLogging/CabinetLoggingStatistics"
import CabinetNewUser from "@/pages/Cabinet/CabinetUsers/CabinetNewUser"
import CabinetNewForm from "@/pages/Cabinet/CabinetForms/CabinetNewForm"
import CabinetMailings from "@/pages/Cabinet/CabinetNotificationsAndMailings/CabinetMailings"
import CabinetNotificationsAdmin from "@/pages/Cabinet/CabinetNotificationsAndMailings/CabinetNotifications"
import CabinetCurrentNotification from "@/pages/Cabinet/CabinetNotificationsAndMailings/CabinetCurrentNotification"
import CabinetCurrentMailing from "@/pages/Cabinet/CabinetNotificationsAndMailings/CabinetCurrentMailing"
import CabinetNewNotificationOrMailing from "@/pages/Cabinet/CabinetNotificationsAndMailings/CabinetNewNotificationOrMailing"
import CabinetFormFill from "@/pages/Cabinet/CabinetForms/CabinetFormFill"
import CabinetOrganizationEditDescription from "@/pages/Cabinet/CabinetSubjects/CabinetOrganizationEdit/CabinetOrganizationEditDescription"
import CabinetOrganizationEditEmployees from "@/pages/Cabinet/CabinetSubjects/CabinetOrganizationEdit/CabinetOrganizationEditEmployees"
import CabinetOrganizationEditPrograms from "@/pages/Cabinet/CabinetSubjects/CabinetOrganizationEdit/CabinetOrganizationEditPrograms"
import CabinetNewOrganizationDescription from "@/pages/Cabinet/CabinetSubjects/CabinetNewOrganization/CabinetNewOrganizationDescription"
import CabinetNewOrganizationEmployees from "@/pages/Cabinet/CabinetSubjects/CabinetNewOrganization/CabinetNewOrganizationEmployees"
import CabinetNewOrganizationPrograms from "@/pages/Cabinet/CabinetSubjects/CabinetNewOrganization/CabinetNewOrganizationPrograms"
import CabinetFormsApproval from "@/pages/Cabinet/CabinetForms/CabinetFormsApproval/CabinetFormsApproval"
import CabinetFormApproval from "@/pages/Cabinet/CabinetForms/CabinetFormsApproval/CabinetFormApproval"

export default [
    {
        path: "/",
        component: PublicHome,
        children: [
            {
                path: "",
                component: Main
            },
            {
                path: "auth",
                component: Auth
            },
            {
                path: "news",
                name: "news-home",
                redirect: { name: "public-news" },
                component: PublicNewsHome,
                children: [
                    {
                        path: "",
                        name: "public-news",
                        component: News
                    },
                    {
                        path: ":id",
                        component: NewsDetail
                    }
                ]
            },
            {
                path: "sign-up",
                component: Registration
            },
            {
                path: "subjects",
                name: "public-subjects-home",
                component: PublicSubjectsHome,
                redirect: { name: "public-subjects" },
                children: [

                    {
                        path: "",
                        name: "public-subjects",
                        props: { baseURL: "" },
                        component: Regions
                    },
                    {
                        path: ":regionId",
                        component: RegionsDetail
                    },
                    {
                        path: "",
                        name: "public-organization-home",
                        component: OrganizationHome,
                        children: [
                            {
                                path: ":regionId/:organizationId",
                                component: Organization
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: "/cabinet",
        component: CabinetHome,
        name: "cabinet",
        children: [
            {
                path: "",
                component: CabinetProfile,
                name: "cabinet profile"
            },
            {
                path: "map",
                meta: {
                    requiredPermissions: [
                        "view_interactive_map"
                    ]
                },
                component: CabinetMap,
                name: "cabinet map"
            },
            {
                path: "subjects",
                name: "cabinet-subjects-home",
                component: CabinetSubjectsHome,
                meta: {
                    requiredPermissions: ["view_organizations"]
                },
                redirect: { name: "cabinet-subjects" },
                children: [
                    {
                        path: "",
                        name: "cabinet-subjects",
                        component: Regions,
                        props: { baseURL: "/cabinet" },
                        meta: {
                            lockedRoles: ["regional_monitoring"]
                        }
                    },
                    {
                        path: ":regionId",
                        component: CabinetRegionDetail,
                        meta: {
                            onlyOwnRegion: ["regional_monitoring"]
                        }
                    },
                    {
                        path: "",
                        name: "cabinet-organization-home",
                        component: OrganizationHome,
                        children: [
                            {
                                path: ":regionId/:organizationId",
                                component: CabinetOrganizationDetail
                            },
                            {
                                path: ":regionId/edit-organization-:organizationId",
                                component: CabinetOrganizationEditHome,
                                redirect: { name: "cabinet-organization-edit-description" },
                                meta: { requiredPermissions: ["edit_organizations"] },
                                children: [
                                    {
                                        path: "description",
                                        name: "cabinet-organization-edit-description",
                                        component: CabinetOrganizationEditDescription
                                    },
                                    {
                                        path: "employees",
                                        component: CabinetOrganizationEditEmployees
                                    },
                                    {
                                        path: "programs",
                                        component: CabinetOrganizationEditPrograms
                                    }
                                ]
                            },
                            {
                                path: ":regionId/new-organization",
                                component: CabinetNewOrganizationHome,
                                redirect: { name: "cabinet-new-organization-description" },
                                meta: { requiredPermissions: ["edit_organizations"] },
                                children: [
                                    {
                                        path: "description",
                                        name: "cabinet-new-organization-description",
                                        component: CabinetNewOrganizationDescription
                                    },
                                    {
                                        path: "employees",
                                        component: CabinetNewOrganizationEmployees
                                    },
                                    {
                                        path: "programs",
                                        component: CabinetNewOrganizationPrograms
                                    }
                                ]
                            }
                        ]
                    }

                ]
            },
            {
                path: "forms",
                name: "cabinet-forms-home",
                meta: { requiredPermissions: ["view_forms"] },
                component: CabinetFormsHome,
                redirect: { name: "cabinet-forms" },
                children: [
                    {
                        path: "",
                        name: "cabinet-forms",
                        component: CabinetForms,
                        meta: { requiredPermissions: ["view_forms"] }
                    },
                    {
                        path: "form-:formId",
                        component: CabinetFormDetail
                    },
                    {
                        path: "fill-form-:formId",
                        component: CabinetFormFill
                    },
                    {
                        path: "new-form",
                        component: CabinetNewForm,
                        meta: { requiredPermissions: ["create_forms"] }
                    },
                    {
                        path: "approval",
                        name: "cabinet-forms-approval-home",
                        component: CabinetFormsApprovalHome,
                        redirect: { name: "cabinet-forms-approval" },
                        children: [
                            {
                                path: "",
                                name: "cabinet-forms-approval",
                                component: CabinetFormsApproval
                            },
                            {
                                path: "approval-form-:formId",
                                component: CabinetFormApproval
                            }
                        ]
                    }
                ]
            },
            {
                path: "listeners",
                name: "cabinet-listeners-home",
                redirect: { name: "cabinet-listeners" },
                meta: { requiredPermissions: ["view_listeners"] },
                component: CabinetListenersHome,
                children: [
                    {
                        component: CabinetListeners,
                        name: "cabinet-listeners",
                        path: ""
                    },
                    {
                        component: CabinetListenersStat,
                        name: "cabinet-listeners-stat",
                        meta: { requiredPermissions: ["view_reports_listeners"] },
                        path: "stat"
                    },
                    {
                        component: CabinetRegionListeners,
                        path: "stat/:regionId",
                        name: "cabinet-region-listeners"
                    },
                    {
                        component: CabinetNewListener,
                        meta: { requiredPermissions: ["create_listeners"] },
                        path: "new-listener"
                    }
                ]
            },
            {
                path: "notifications",
                component: CabinetNotifications
            },
            {
                path: "news",
                component: CabinetNewsHome,
                name: "cabinet-news-home",
                redirect: "cabinet-news",
                children: [
                    {
                        path: "",
                        name: "cabinet-news",
                        component: CabinetNews,
                    },
                    {
                        path: "add",
                        component: CabinetAddNewsPage,
                        meta: { requiredPermissions: ["publish_articles"] },

                    },
                    {
                        path: ":newsId",
                        component: CabinetEditNews,
                        meta: { requiredPermissions: ["edit_articles"] },
                    },
                ]
            },
            {
                path: "users",
                name: "cabinet-users-home",
                meta: { requiredPermissions: ["view_users"] },
                component: CabinetUsersHome,
                redirect: { name: "cabinet-users" },
                children: [
                    {
                        path: "",
                        name: "cabinet-users",
                        component: CabinetUsers,

                    },
                    {
                        path: "new-user",
                        component: CabinetNewUser
                    },
                ]
            },
            {
                path: "notifications-and-mailings",
                meta: { requiredPermissions: ["view_mailings"] },
                component: CabinetNotificationsAndMailingsHome,
                name: "notifications-and-mailings-home",
                redirect: "/cabinet/notifications-and-mailings/notifications",
                children: [
                    {
                        path: "",
                        component: CabinetNotificationsAndMailings,
                        children: [
                            {
                                path: "",
                                redirect: "/cabinet/notifications-and-mailings/notifications",
                            },
                            {
                                path: "mailings",
                                component: CabinetMailings
                            },
                            {
                                path: "notifications",
                                component: CabinetNotificationsAdmin,
                            },
                        ],
                    },
                    {
                        path: "notifications/:notificationId",
                        component: CabinetCurrentNotification,
                        meta: {
                            requiredPermissions: ["edit_mailings"]
                        }
                    },
                    {
                        path: "mailings/:mailingId",
                        component: CabinetCurrentMailing,
                        meta: {
                            requiredPermissions: ["edit_mailings"]
                        }
                    },
                    {
                        path: "new",
                        component: CabinetNewNotificationOrMailing,
                        meta: {
                            requiredPermissions: ["edit_mailings"]
                        }
                    }
                ]
            },
            {
                path: "reports",
                meta: { requiredPermissions: ["view_reports"] },
                component: CabinetReportsHome,
                name: "cabinet-reports-home",
                redirect: "/cabinet/reports/reports-all",
                children: [
                    {
                        path: "",
                        redirect: "/cabinet/reports/reports-all",
                    },
                    {
                        path: "reports-all",
                        component: CabinetReportsAll
                    },
                    {
                        path: "templates",
                        component: CabinetTemplates
                    },
                    {
                        path: "history-requests",
                        component: CabinetHistoryRequests
                    }
                ]
            },
            {
                path: "logging",
                component: CabinetLoggingHome,
                meta: { requiredPermissions: ["view_logs"] },
                children: [
                    {
                        path: "",
                        redirect: "/cabinet/logging/forms"
                    },
                    {
                        path: "forms",
                        name: "logging-forms",
                        component: CabinetLoggingForms,

                    },
                    {
                        path: "logins",
                        name: "logging-logins",
                        component: CabinetLoggingLogins,

                    },
                    {
                        path: "statistics",
                        component: CabinetLoggingStatistics,

                    }
                ]
            }
        ]
    },
    {
        path: "/:catchAll(.*)",
        component: NotFounded,
    }
]