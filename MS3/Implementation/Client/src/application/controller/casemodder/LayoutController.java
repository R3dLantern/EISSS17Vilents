package application.controller.casemodder;

import application.Main;
import application.controller.ISignInUpHandling;
import application.util.LayoutManager;
import application.util.ServerRequest;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.Tab;
import javafx.scene.control.TabPane;
import model.HttpResponse;

/**
 * Controller-Klasse f�r das Casemodder-Layout
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
	
	private int userId;
	
	private LayoutManager manager;
	
	
	public void initializeWithLayoutManager() {
		this.manager = new LayoutManager(this.userId);
		tabDashboard.setContent(Main.sceneLoader.getElement(false, "dashboard_casemodder"));
		tabs.getSelectionModel().selectedItemProperty().addListener(
			new ChangeListener<Tab>() {
				@Override
				public void changed(ObservableValue<? extends Tab> ov, Tab deselected, Tab selected) {
					deselected.setContent(null);
					switch(selected.getId()) {
					default:
					case "tabDashboard":
						selected.setContent(Main.sceneLoader.getElement(false, "dashboard_casemodder"));
						break;
					case "tabProfile":
						selected.setContent(manager.getProfileTabContent(true));
						break;
					case "tabMessages":
						//selected.setContent(manager.getMessagesContent());
						break;
					case "tabProjects":
						selected.setContent(manager.getProjectIndexPane(true));
						break;
					}
				}
			}
		);
	}
		
	
	/**
	 * Loggt den Benutzer aus und leitet zur�ck auf die Login-Maske.
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
	
	/**
	 * userId Setter
	 * @param id neue ID
	 */
	public void setUserId(int id) {
		this.userId = id;
	}
	
	/**
	 * userId Getter
	 * @return gesetzte userId
	 */
	public int getUserId() {
		return this.userId;
	}
}
