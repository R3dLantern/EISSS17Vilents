package application.controller;

/**
 * Interface f�r polymorphes Layout-Rendering
 * @author Leonid Vilents
 */
public interface ILayoutController {
	
	/**
	 * Initialisiert das Layout mit einem Manager, sowie den ben�tigen Benutzerdaten.
	 */
	public abstract void initializeWithLayoutManager();
	
	/**
	 * Setter f�r usernameLabel.
	 * @param email zu setzender String, vorzugsweise Benutzer-Email
	 */
	public abstract void setUsername(String email);
	
	/**
	 * Setter f�r userId.
	 * @param id Benutzer-ID
	 */
	public abstract void setUserId(int id);
}
