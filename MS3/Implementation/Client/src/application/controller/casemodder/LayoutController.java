package application.controller.casemodder;

import application.Main;
import application.controller.ISignInUpHandling;
import application.util.ServerRequest;
import javafx.event.Event;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.Tab;
import javafx.scene.control.TabPane;
import model.HttpResponse;

/**
 * Controller-Klasse für das Casemodder-Layout
 * @author Leonid Vilents
 */
public class LayoutController implements ISignInUpHandling {
	
	@FXML
	private TabPane tabs;
	
	@FXML
	private Tab tabDashboard;
	
	@FXML
	private Tab tabProfile;
	
	@FXML
	private Tab tabMessages;
	
	@FXML
	private Tab tabProjects;
	
	@FXML
	private Label usernameLabel;
	
	@FXML
	private Button logoutButton;
	
	/**
	 * Versieht die Tabs mit Eventhandlern, die deren Inhalt beim Abwählen
	 * löschen und beim Anwählen erneut vom Server anfordern.
	 */
	@FXML
	protected void initialize()
	{
		tabDashboard.setContent(Main.sceneLoader.getElement(false, "dashboard_casemodder"));
		tabDashboard.setOnSelectionChanged(new EventHandler<Event>() {
            @Override
            public void handle(Event t) {
                tabDashboard.setContent(
                	tabDashboard.isSelected()
                	? Main.sceneLoader.getElement(false, "dashboard_casemodder")
                	: null
                );
            }
        });
		
		//TODO: FXML-Dateien implementieren
		
		/*tabProfile.setOnSelectionChanged(new EventHandler<Event>() {
			@Override
			public void handle(Event t) {
				tabProfile.setContent(
					tabProfile.isSelected()
					? Main.sceneLoader.getElement(false, "profile_casemodder")
					: null
				);
			}
		});*/
		
		/*tabMessages.setOnSelectionChanged(new EventHandler<Event>() {
			@Override
			public void handle(Event t) {
				tabMessages.setContent(
					tabMessages.isSelected()
					? Main.sceneLoader.getElement(false, "messages")
					: null
				);
			}
		});*/
		
		/*tabProjects.setOnSelectionChanged(new EventHandler<Event>() {
			@Override
			public void handle(Event t) {
				tabProjects.setContent(
					tabProjects.isSelected()
					? Main.sceneLoader.getElement(false, "projects_casemodder")
					: null
				);
			}
		});*/
	}
	
	/**
	 * Loggt den Benutzer aus und leitet zurück auf die Login-Maske.
	 */
	@FXML
	protected void handleLogoutButton()
	{
		ServerRequest req = new ServerRequest(LOGOUT_STRING);
		
		HttpResponse res = req.get();
		
		switch (res.getStatusCode()) {
		case 200:
			Main.sceneLoader.loadScene(FILENAME_LOGIN);
			return;
		default:
			return;
		}
	}
	
	 
	
	
	/**
	 * Setzt den Text von usernameLabel
	 * @param email zu setzender Text
	 */
	public void setUsernameLabelText(String email)
	{
		usernameLabel.setText(email);
	}
}
