package application.util.ui;

import java.io.IOException;

import application.controller.ILayoutController;
import application.util.EFXML;
import javafx.event.ActionEvent;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.layout.Pane;
import javafx.stage.Stage;

/**
 * Management-Klasse für Scene-Loading
 * @author Leonid Vilents
 */
public class SceneLoader {
	
	private Stage primaryStage;
	
	/**
	 * Konstruktor
	 * @param primaryStage Stage-Objekt, welches als Primär-Stage angesehen wird.
	 */
	public SceneLoader(Stage primaryStage)
	{
		this.primaryStage = primaryStage;
	}
	
	
	/**
	 * Lädt die Loginmaske und erzeugt das Primärfenster
	 */
	public void init()
	{
		try {
			Parent content = FXMLLoader.load(getClass().getResource(EFXML.LOGIN.fxml()));
			Scene scene = new Scene(content);
			this.primaryStage.setScene(scene);
			this.primaryStage.show();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
	/**
	 * Lädt eine neue Scene ins Primärfenster und zeigt dieses.
	 * @param fxml Voller Dateipfad, im Bestfall ein String aus dem EFXML-Enum.
	 */
	public void loadScene(String fxml)
	{
		try{
			Parent content = FXMLLoader.load(getClass().getResource(fxml));
			this.primaryStage.getScene().setRoot(content);
			this.primaryStage.show();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
	/**
	 * Gibt die Stage zurück, in der ein ActionEvent ausgeführt wurde
	 * @param event ActionEvent-Objekt, dessen Stage zurückgegeben soll
	 * @return Das zu referenzierende Stage-Objekt
	 */
	public Stage getStage(ActionEvent event)
	{
		Scene scene = ((Node) event.getSource()).getScene();
		return (Stage) scene.getWindow();
	}
	
	
	/**
	 * Gibt die in diesem SceneLoader hinterlegte primaryStage zurück
	 * @return this.primaryStage
	 */
	public Stage getPrimaryStage()
	{
		return this.primaryStage;
	}
	
	
	/**
	 * Lädt die Layout-Scene für die Benutzeroberfläche
	 * @param email Email-Adresse des Benutzers
	 * @param userId Benutzer-ID
	 * @param isUserCasemodder Flag für Benutzertyp-Überprüfung
	 */
	public void loadLayout(String email, int userId, boolean isUserCasemodder)
	{
		FXMLLoader loader = new FXMLLoader(
				
				getClass()
				.getResource(
						isUserCasemodder
						? EFXML.CM_LAYOUT.fxml()
						: EFXML.SP_LAYOUT.fxml()
						)
				);
		try {
			this.primaryStage.setScene(new Scene((Pane) loader.load()));
			ILayoutController controller = loader.<ILayoutController>getController();
			controller.setUsername(email);
			controller.setUserId(userId);
			controller.initializeWithLayoutManager();
			this.primaryStage.show();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
