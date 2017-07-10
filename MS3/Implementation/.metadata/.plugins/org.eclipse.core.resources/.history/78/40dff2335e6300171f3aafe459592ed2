package application.util;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Sortiert JSONArrays nach dem Bubblesort-Prinzip.
 * Gedacht für kleinere Arrays, zur Sortierung der Rankings
 * @author Léon
 *
 */
public class BubbleSorter {
	
	/**
	 * Führt den Bubblesort basierend auf dem Key aus.
	 * <a href="http://www.java-programmieren.com/bubblesort-java.php">Quelle zu Code-Struktur</a>
	 */
	public static JSONArray sort(JSONArray array, String rankKey)
	{
		JSONObject tmp;
		try {
			for (int i = 1; i < array.length(); i++) {
				for (int j = 0; j < array.length() -1; j++) {
					if(array.getJSONObject(j).getJSONObject("rankings").getInt(rankKey) > array.getJSONObject(j + 1).getJSONObject("rankings").getInt(rankKey)) {
						tmp = array.getJSONObject(j);
						array.put(j, array.getJSONObject(j + 1));
						array.put(j + 1, tmp);
					}
				}
			}
			return array;
		} catch (JSONException je) {
			je.printStackTrace();
			return null;
		}
		
	}
}
