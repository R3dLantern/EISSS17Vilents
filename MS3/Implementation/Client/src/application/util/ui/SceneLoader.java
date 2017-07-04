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
 * Management-Klasse f�r Scene-Loading
 * @author Leonid Vilents
 */
public class SceneLoader {
	
	private Stage primaryStage;
	
	/**
	 * Konstruktor
	 * @param primaryStage Stage-Objekt, welches als Prim�r-Stage angesehen wird.
	 */
	public SceneLoader(Stage primaryStage)
	{
		this.primaryStage = primaryStage;
	}
	
	
	/**
	 * L�dt die Loginmaske und erzeugt das Prim�rfenster
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
	 * L�dt eine neue Scene ins Prim�rfenster und zeigt dieses.
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
	 * Gibt die Stage zur�ck, in der ein ActionEvent ausgef�hrt wurde
	 * @param event ActionEvent-Objekt, dessen Stage zur�ckgegeben soll
	 * @return Das zu referenzierende Stage-Objekt
	 */
	public Stage getStage(ActionEvent event)
	{
		Scene scene = ((Node) event.getSource()).getScene();
		return (Stage) scene.getWindow();
	}
	
	
	/**
	 * Gibt die in diesem SceneLoader hinterlegte primaryStage zur�ck
	 * @return this.primaryStage
	 */
	public Stage getPrimaryStage()
	{
		return this.primaryStage;
	}
	
	
	/**
	 * L�dt die Layout-Scene f�r die Benutzeroberfl�che
	 * @param email Email-Adresse des Benutzers
	 * @param userId Benutzer-ID
	 * @param isUserCasemodder Flag f�r Benutzertyp-�berpr�fung
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
