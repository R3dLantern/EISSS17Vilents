package application;

import java.io.IOException;

import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;

/**
 * Management von Login und Registrierung
 * @author Léon
 */
public class UserAccountController
{
	public static Scene getLoginPage() throws IOException
	{
		Parent loginSceneContent = FXMLLoader.load(UserAccountController.class.getResource("login.fxml"));
		Scene loginScene = new Scene(loginSceneContent);
		return loginScene;
	}
}
