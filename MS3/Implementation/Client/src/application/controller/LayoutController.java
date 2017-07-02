package application.controller;

import application.Main;
import application.util.ServerRequest;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.Tab;
import model.HttpResponse;

public class LayoutController implements ISignInUpHandling {
	
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
	public void setUsernameLabel(String email)
	{
		usernameLabel.setText(email);
	}
	
	public void loadDashboard()
	{
		tabDashboard.setContent(Main.sceneLoader.loadScene("dashboard"));
	}
}
