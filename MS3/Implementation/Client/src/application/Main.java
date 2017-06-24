package application;
	
import javafx.application.Application;
import javafx.stage.Stage;


/**
 * Haupt-Applikationsklasse für die Client-Anwendung im
 * Rahmen der EIS-Veranstaltung im Sommersemester 2017
 * @author Leonid Vilents
 * @version 1.0
 *
 */
public class Main extends Application
{
	@Override
	public void start(Stage primaryStage)
	{
		try {
			primaryStage = this.configureStage(primaryStage);
			primaryStage.setScene(SceneLoader.getSceneFor("login.fxml"));
			primaryStage.show();
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
}
