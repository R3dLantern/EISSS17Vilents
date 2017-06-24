package application;

import java.io.IOException;

import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;

public class SceneLoader {
	
	/**
	 * Lädt FXML-Dateien und verpackt sie in Scene-Objekte.
	 * @param resource Der FXML-Dateiname
	 * @return Scene-Objekt, in das der Inhalt der FXML-Datei geladen wurde.
	 * @throws IOException FXMLLoader findet keine Datei unter dem angebenen Namen
	 */
	public static Scene getSceneFor(String resource) throws IOException
	{
		Parent sceneContent = FXMLLoader.load(SceneLoader.class.getResource(resource));
		Scene scene = new Scene(sceneContent);
		return scene;
	}
}
