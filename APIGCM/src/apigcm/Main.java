/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package apigcm;

/**
 *
 * @author christianmarchantsaavedra
 */
public class Main {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws Exception {
        String udkey = "eW9DdNlmlXA:APA91bF-dVpnCbE7iXQcv0ap8DCr20YeCRCkR3Q4i08qpYAxQ_gDtZS3bppyYlB9XpHSTP1AzpR1r75HIV3upm4yZmLEiYYg8MUXHR_a9Q-i9f92OZrQ14RuLeXYHBXwwDWIIbd711uA";
        
        String title = "Camion Llegando";
        String message = "El camion patente BPZC-68 llegara en 5 min. a su campo.";
        
        FCMNotification test = new FCMNotification();
        //test.getInformation();
        test.sendNotification(udkey, title, message);
        
        
    }
    
    
    
    
}
