package application.util.ui;

/**
 * Absolute Dateipfad-Strings aller FXML-Dateien
 * @author Leonid Vilents
 */
public enum EFXML {

	CM_SIGNUP ("/fxml/casemodder/signup.fxml"),
	CM_LAYOUT ("/fxml/casemodder/layout.fxml"),
	CM_PROFILE ("/fxml/casemodder/profile.fxml"),
	CM_PROJECTS ("/fxml/casemodder/projects.fxml"),
	CM_DASHBOARD ("/fxml/casemodder/dashboard.fxml"),
	SP_SIGNUP ("/fxml/sponsor/signup.fxml"),
	SP_LAYOUT ("/fxml/sponsor/layout.fxml"),
	SP_PROFILE ("/fxml/sponsor/profile.fxml"),
	SP_PROJECTS ("/fxml/sponsor/projects.fxml"),
	SP_DASHBOARD ("/fxml/sponsor/dashboard.fxml"),
	SP_SPONSORING ("/fxml/sponsor/sponsoring.fxml"),
	LOGIN ("/fxml/login.fxml"),
	PROJECT("/fxml/project.fxml"),
	MESSAGES ("/fxml/messages.fxml"),
	NEW_MESSAGE ("/fxml/new_message.fxml"),
	DELETE_PANEL ("/fxml/delete_panel.fxml"),
	O_PROJECT ("/fxml/snippet/project_overview.fxml"),
	O_MESSAGE ("/fxml/snippet/message_overview.fxml"),
	E_DASHBOARD ("/fxml/snippet/dashboard_event.fxml"),
	P_PROFILE ("/fxml/snippet/profile_project.fxml"),
	A_SPONSORING ("/fxml/snippet/sponsoring_applicant.fxml"),
	C_SPONSORING ("/fxml/snippet/sponsoring_candidate.fxml");
	
	private final String fxml;
	
	EFXML(String fxml) { this.fxml = fxml; }
	
	public String fxml() { return fxml; }
	
}
