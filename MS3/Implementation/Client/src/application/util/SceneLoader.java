package application.util;

import java.io.IOException;

import application.controller.LayoutController;
import javafx.event.ActionEvent;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.layout.Pane;
import javafx.stage.Stage;

/**
 * Management-Klasse f�r Scene-Loading
 * @author L�on
 */
public class SceneLoader {
	
	private static final String FXML_PATH = "/application/controller/fxml/";
	@SuppressWarnings("unused")
	private static final String FXML_SNIPPET_PATH = "application/controller/fxml/snippet/";
	
	private Stage primaryStage;
	
	/**
	 * SceneLoader constructor
	 * @param primaryStage
	 */
	public SceneLoader(Stage primaryStage)
	{
		this.primaryStage = primaryStage;
	}
	
	
	/**
	 * Initialisiert die erste Scene.
	 * @throws IOException
	 */
	public void init()
	{
		// TODO: Session-Checking
		try {
			Parent content = FXMLLoader.load(getClass().getResource(FXML_PATH + "login.fxml"));
			Scene scene = new Scene(content);
			this.primaryStage.setScene(scene);
			this.primaryStage.show();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
	/**
	 * L�dt eine Scene.
	 * @param fxml Der Dateiname der zur Scene zugeh�rigen FXML-Datei, ohne Dateiendung
	 * @throws IOException Die Datei konnte nicht gefunden werden
	 */
	public void loadScene(String fxml)
	{
		String fullPath = SceneLoader.FXML_PATH + fxml + ".fxml";
		
		try{
			Parent content = FXMLLoader.load(getClass().getResource(fullPath));
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
	
	
	public void loadLayout(String email, boolean isSponsor)
	{
		FXMLLoader loader = new FXMLLoader(
				getClass()
				.getResource(
						isSponsor
						? FXML_PATH + "layout_sponsor.fxml"
						: FXML_PATH + "layout_casemodder.fxml"
						)
				);
		try {
			this.primaryStage.setScene(new Scene((Pane) loader.load()));
			LayoutController controller = loader.<LayoutController>getController();
			controller.setUsernameLabel(email);
			controller.loadDashboard();
			this.primaryStage.show();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
