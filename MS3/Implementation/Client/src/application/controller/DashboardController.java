package application.controller;

import org.json.JSONException;
import org.json.JSONObject;

import application.Main;
import application.util.ServerRequest;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.Label;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.layout.Pane;
import model.HttpResponse;

public class DashboardController {
	
	private final String DASHBOARD_STRING = "http://%s:%s/dashboard";
	
	@FXML
	private Pane eventPane;
	
	@FXML
	private Label repLabel;
	
	@FXML
	protected void initialize()
	{
		
	}
}
