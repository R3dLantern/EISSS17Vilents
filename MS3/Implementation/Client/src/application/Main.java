package application;
	
import application.util.SceneLoader;
import javafx.application.Application;
import javafx.stage.Stage;


/**
 * Haupt-Applikationsklasse für die Client-Anwendung im
 * Rahmen der EIS-Veranstaltung im Sommersemester 2017
 * @author Leonid Vilents
 * @version 1.0
 */
public class Main extends Application
{
	private Stage primaryStage;
	
	private SceneLoader sceneLoader;
	
	@Override
	public void start(Stage primaryStage)
	{
		primaryStage = this.configureStage(primaryStage);
		this.setPrimaryStage(primaryStage);
		this.setSceneLoader(new SceneLoader(primaryStage));
		try {
			this.sceneLoader.init();
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public static void main(String[] args)
	{
		launch(args);
	}
	
	/**
	 * Basiskonfiguration für das Applikationsfenster.
	 * @param target das zu konfigurierende Stage-Objekt
	 * @return konfiguriertes Stage-Objekt
	 */
	private Stage configureStage(Stage target)
	{
		target.setResizable(false);
		
		target.setWidth(800);
		target.setHeight(600);
		
		target.setTitle("EIS SS2017 Vilents");
		return target;
	}
	
	/**
	 * Setter für this.primaryStage
	 * @param primaryStage zu setzende primaryStage
	 */
	private void setPrimaryStage(Stage primaryStage)
	{
		this.primaryStage = primaryStage;
	}
	
	/**
	 * Getter für this.primaryStage
	 * @return die adressierte primaryStage
	 */
	public Stage getPrimaryStage()
	{
		return this.primaryStage;
	}
	
	/**
	 * Setter für this.sceneLoader
	 * @param primaryStage zu setzenden SceneLoader
	 */
	private void setSceneLoader(SceneLoader sceneLoader)
	{
		this.sceneLoader = sceneLoader;
	}
	
	/**
	 * Getter für this.sceneLoader
	 * @return der adressierte SceneLoader
	 */
	public SceneLoader getMainSceneLoader()
	{
		return this.sceneLoader;
	}
}
