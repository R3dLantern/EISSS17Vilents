package application.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * Hilfsklasse für Funktionen rund ums Passwort
 * @author Léon
 *
 */
public class PasswordUtil {
	public static final String ERROR_HASH_FAILED = "Hashing fehlgeschlagen";
	
	public static final String ALGORITHM_MD5 = "MD5";
	public static final String ALGORITHM_SHA1 = "SHA-1";
	public static final String ALGORITHM_SHA256 = "SHA-256";
	public static final String ALGORITHM_SHA382 = "SHA-384";
	public static final String ALGORITHM_SHA512 = "SHA-512";
	
	/**
	 * Erzeugt eine MD5-Hashsumme für einen String.
	 * @param algorithm Der Hash-Algorithmus, im Bestfall entweder MD5, SHA-1, SHA-256, SHA-384, oder SHA-512.
	 * @param toHash der zu hashende String
	 * @return die MD5-Hashsumme des Strings
	 */
	public static String getHash(String algorithm, String toHash)
	{
		try{
			MessageDigest md = MessageDigest.getInstance(algorithm);
			md.update(toHash.getBytes());
			byte[] bytes = md.digest();
			StringBuilder sb = new StringBuilder();
	        for (int i=0; i< bytes.length ;i++) {
		        sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
		    }
			return sb.toString();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
			return ERROR_HASH_FAILED;
		}
	}
}
