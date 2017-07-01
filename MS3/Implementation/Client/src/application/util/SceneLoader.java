package application.util;

import java.io.IOException;

import javafx.event.ActionEvent;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

/**
 * Management-Klasse für Scene-Loading
 * @author Léon
 */
public class SceneLoader {
	
	private static final String FXML_PATH = "/application/controller/fxml/";
	
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
			Parent content = FXMLLoader.load(SceneLoader.class.getResource(FXML_PATH + "login.fxml"));
			Scene scene = new Scene(content);
			this.primaryStage.setScene(scene);
			this.primaryStage.show();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
	/**
	 * Lädt eine Scene.
	 * @param event Das ActionEvent-Objekt des Controllers, der diese Methode aufgerufen hat
	 * @param fxml Der Dateiname der zur Scene zugehörigen FXML-Datei, ohne Dateiendung
	 * @throws IOException Die Datei konnte nicht gefunden werden
	 */
	public void loadScene(ActionEvent event, String fxml)
	{
		String fullPath = SceneLoader.FXML_PATH + fxml + ".fxml";
		
		try{
			Parent content = FXMLLoader.load(SceneLoader.class.getResource(fullPath));
			Scene scene = ((Node) event.getSource()).getScene();
			scene.setRoot(content);
			Stage primaryStage = (Stage) scene.getWindow();
			primaryStage.show();
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
}
