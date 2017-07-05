package application.controller;

/**
 * Interface f�r polymorphes Profil-Rendering.
 * @author L�on
 *
 */
public interface IProfileController {
	
	/**
	 * Fordert vom Server Profildaten an und bef�llt die FXML mit diesen.
	 * @param id Benutzer-ID
	 */
	public abstract void initWithData(int id);
	
	/**
	 * Holt den Namen aus dem Label.
	 * @return Name aus Label
	 */
	public String getName();
}
