package application.controller;

import org.json.JSONException;
import org.json.JSONObject;

import application.Main;
import application.util.ServerRequest;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.Tab;
import model.HttpResponse;

public class LayoutController implements ISignInUpHandling {
	
	private final String DASHBOARD_STRING = "http://%s:%s/dashboard";
	
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
	protected void initialize()
	{
		ServerRequest req = new ServerRequest(DASHBOARD_STRING);
		
		HttpResponse res = req.get();
		if (res.getStatusCode() == 200) {
			try {
				JSONObject data = new JSONObject(res.getContent());
				usernameLabel.setText(data.getString("email"));
			} catch (JSONException e) {
				e.printStackTrace();
			}
			return;
		}
		
		if (res.getStatusCode() <= 400) {
			Alert alert = new Alert(AlertType.ERROR);
			alert.setHeaderText("Fehler " + res.getStatusCode());
			alert.setTitle("Fehler beim Verbinden");
			switch (res.getStatusCode()) {
			case 400:
				alert.setHeaderText("HTTP 400 - Bad Request");
				break;
			case 404:
				alert.setHeaderText("HTTP 404 - Not found");
				break;
			case 500:
				alert.setHeaderText("HTTP 500 - Internal Server Error");
				break;
			default:
				break;
			}
			
			alert.setContentText("Es ist ein Fehler aufgetreten.");
			alert.showAndWait();
			Main.sceneLoader.loadScene("login");
			return;
		}
	}
	
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
}
