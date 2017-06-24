package controller;

import java.io.IOException;

import application.SceneLoader;
import javafx.fxml.FXML;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Hyperlink;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;

public class LoginPageController {
	@FXML
	private TextField email;
	
	@FXML
	private PasswordField password;
	
	@FXML
	private Button loginButton;
	
	@FXML
	private Hyperlink signupLink;
	
	@FXML
	protected void click()
	{
		email.setText("hurr");
	}
	
	public static Scene getLoginScene() throws IOException
	{
		return SceneLoader.getSceneFor("login.fxml");
	}
}
