package application.util;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Sortiert JSON-Objekte mittels QuickSort-Algorithmus.
 * <a href="http://www.java-uni.de/index.php?Seite=86">Quelle f�r Code-Struktur</a>
 * @author Leonid Vilents
 */
public class QuickSorter {
	
	/**
	 * Hauptbefehl f�r QuickSort-Algorithmus
	 * @param array zu sortierendes Array
	 */
	public static void sort(JSONArray array)
	{
		qSort(array, 0, array.length()-1);
	}
	
	/**
	 * Rekursionsteil des QuickSorts
	 * @param array
	 * @param left
	 * @param right
	 */
	static void qSort(JSONArray array, int left, int right)
	{
		if(left < right) {
			int i = partition(array, left, right);
			qSort(array, left, i-1);
			qSort(array, i+1, right);
		}
	}
	
	/**
	 * Partitionsteil des Quicksorts
	 * @param array
	 * @param left
	 * @param right
	 * @return
	 */
	static int partition(JSONArray array, int left, int right)
	{
		int pivot, i, j;
		JSONObject help;
		try {
			
			// Es soll nach Gesamtreputation sortiert werden
			pivot = array.getJSONObject(right).getInt("rep");
			i = left;
			j = right - 1;
			
			while (i <= j) {
				if(array.getJSONObject(i).getInt("rep") > pivot) {
					//switch array[i] und array[j]
					help = array.getJSONObject(i);
					array.put(i, array.getJSONObject(j));
					array.put(j, help);
					
					j--;
				} else i++;
			}
			
			help = array.getJSONObject(i);
			array.put(i, array.getJSONObject(right));
			array.put(right, help);
			
		} catch (JSONException je) {
			je.printStackTrace();
			return -1;
		}
		
		return i;
	}
}