/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package apigcm;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author christianmarchantsaavedra
 */

public class FCMNotification {
    public final static String AUTH_KEY_FCM = "AAAAAevkY5M:APA91bG1NHA9pXk85oK22IuP5hcFWezceYWM3QmjoysYiT8QaS6Lb3t5iq9Hq5XWH16GL-8iT8ie_HiGNmee6bAn57xIW55lsULuKQrOoZyOTYY3g6SKXcNyPUSVi-_qVa_fqvJxjCTc";
    public final static String API_URL_FCM = "https://fcm.googleapis.com/fcm/send";

    public void sendNotification(final String deviceToken,final String title, final String message){
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    URL url = new URL(API_URL_FCM);
                    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                    conn.setRequestMethod("POST");
                    conn.setRequestMethod("POST");
                    conn.setRequestProperty("Authorization", "key=" + AUTH_KEY_FCM);
                    conn.setRequestProperty("Content-Type", "application/json");
                    conn.setDoOutput(true);
                    conn.setDoInput(true);

                    JSONObject parentjson = new JSONObject();
                    JSONObject notificationValue = new JSONObject();
                    notificationValue.put("body", message);
                    notificationValue.put("title", title);
                    notificationValue.put("sound", "default");

                    parentjson.put("to",deviceToken);
                    parentjson.put("notification",notificationValue);

                    System.out.println("MESSAGING_FIREBASE: " + parentjson.toString());
                    DataOutputStream os = new DataOutputStream(conn.getOutputStream());
                    //os.writeBytes(URLEncoder.encode(jsonParam.toString(), "UTF-8"));
                    os.writeBytes(parentjson.toString());

                    os.flush();
                    os.close();

                    System.out.println("MESSAGING_FIREBASE " + String.valueOf(conn.getResponseCode()));
                    System.out.println("MESSAGING_FIREBASE + " + conn.getResponseMessage());

                    conn.disconnect();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });

        thread.start();
    }
    
    public void getInformation() throws JSONException{
        URL url;
        try {
            // Creando un objeto URL
            //url = new URL("https://firestore.googleapis.com/v1beta1/projects/pataconf/databases/(default)/documents/usuario/correo");
            //url = new URL("https://firestore.googleapis.com/v1beta1/projects/employeeapp-66646/databases/(default)/documents/newsFeed)";
            //url = new URL("https://firestore.googleapis.com/v1beta1/{name=projects/*/databases/*/documents/*/**}");
            url = new URL("https://firestore.googleapis.com/v1beta1/projects/pataconf/databases/(default)/documents/usuario/O9JhFpwt83WG958FLtHNbLrei4X2?");
            
            // Realizando la petición GET
            URLConnection con = url.openConnection();
 
            // Leyendo el resultado
            BufferedReader in = new BufferedReader(new InputStreamReader(
                    con.getInputStream()));
            
            
            String linea;
            while ((linea = in.readLine()) != null) {
                System.out.println(linea);
            }
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }
}
