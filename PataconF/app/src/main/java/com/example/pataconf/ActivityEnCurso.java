package com.example.pataconf;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;

import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

import Modelo.Notificacion;
import Modelo.Viaje;


public class ActivityEnCurso extends Fragment implements View.OnClickListener {

    private RecyclerView recycler;
    private NotificacionAdapter adapter;
    private RecyclerView.LayoutManager lManager;
    private FragmentManager fragmentManager;
    private ActivityCargando fragmentCargando;
    private String tipo;
    private String idViaje;
    private ActivityDetalleViaje fragmentDV;
    private ActivityPrincipal papa;
    private String origen;

    public ActivityEnCurso() {

    }
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.activity_encurso, container, false);
        return inflater.inflate(R.layout.activity_encurso, container, false);
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {

        List items = new ArrayList();
        Bundle args = getArguments();
        ArrayList<Viaje> viajes = (ArrayList<Viaje>) args.getSerializable("viajes");
        int planned = args.getInt("planned");
        this.origen = args.getString("origen");
        fragmentDV = new ActivityDetalleViaje();
        fragmentDV.setPapa(this.papa);
        fragmentDV.setOrigen(this.origen);

        for (Viaje v: viajes){
            if (planned==1){
                items.add(new Notificacion(v.getId(),R.drawable.planned, v.getEstado(), v.getIdChofer(), v.getIdProductor(), v.getOrigen(), v.getDestino(), v.getOrigenTexto(), v.getDestinoTexto(), v.getUbicacionActual(), v.getPatente(), 1, v.getFecha(), v.getHora()));
            }
            else if (v.getEstado().compareTo("en ruta")==0 || v.getEstado().compareTo("Saliendo")==0){
                items.add(new Notificacion(v.getId(),R.drawable.patacon, v.getEstado(), v.getIdChofer(), v.getIdProductor(), v.getOrigen(), v.getDestino(), v.getOrigenTexto(), v.getDestinoTexto(), v.getUbicacionActual(), v.getPatente(), 0,  v.getFecha(), v.getHora()));
            }
            else {
                items.add(new Notificacion(v.getId(),R.drawable.pataconrojo, v.getEstado(), v.getIdChofer(), v.getIdProductor(), v.getOrigen(), v.getDestino(), v.getOrigenTexto(), v.getDestinoTexto(), v.getUbicacionActual(), v.getPatente(), 0,  v.getFecha(), v.getHora()));
            }
        }


        // Obtener el Recycler
        recycler = (RecyclerView) view.findViewById(R.id.reciclador);
        recycler.setHasFixedSize(true);

        // Usar un administrador para LinearLayout
        lManager = new LinearLayoutManager(this.getActivity());
        recycler.setLayoutManager(lManager);

        // Crear un nuevo adaptador
        adapter = new NotificacionAdapter(items, this);


        recycler.setAdapter(adapter);


    }

    @Override
    public void onClick(View v) {


        Button bt = (Button) v;


        System.out.println("Click: " + bt.getText());
        List<String> salida = new ArrayList<>();

        StringTokenizer arr = new StringTokenizer(bt.getText().toString(), "\n");
        while(arr.hasMoreTokens()){
            salida.add(arr.nextToken());
        }

        tipo = salida.get(1);
        idViaje = salida.get(0);

        System.out.println("tipo: " + tipo);
        System.out.println("idSalida: " + idViaje);

        if (tipo.compareTo("M")==0){

            String label = "Ubicacion Actual";
            String uriBegin = "geo:"+salida.get(2);
            String query = salida.get(2)+"(" + label + ")";
            String encodedQuery = Uri.encode( query  );
            String uriString = uriBegin + "?q=" + encodedQuery;
            Uri uri = Uri.parse( uriString );
            Intent intent = new Intent(android.content.Intent.ACTION_VIEW, uri );
            startActivity( intent );


            /*Uri gmmIntentUri = Uri.parse("geo:0,0?q=-33.8666,151.1957(Google+Sydney)");
            Intent mapIntent = new Intent(Intent.ACTION_VIEW, gmmIntentUri);
            mapIntent.setPackage("com.google.android.apps.maps");
            startActivity(mapIntent);*/


        }
        else {
            this.fragmentCargando = new ActivityCargando();
            final FragmentTransaction transaction = fragmentManager.beginTransaction();
            transaction.replace(R.id.main_container, fragmentCargando).commit();

            FirebaseFirestore db = FirebaseFirestore.getInstance();
            DocumentReference docRef = db.collection("viaje").document(idViaje);
            docRef.get().addOnCompleteListener(new OnCompleteListener<DocumentSnapshot>() {
                @Override
                public void onComplete(@NonNull Task<DocumentSnapshot> task) {
                    if (task.isSuccessful()) {
                        DocumentSnapshot doc = task.getResult();
                        if (doc.exists()) {

                            Viaje v = new Viaje(doc.getId(),doc.get("estado").toString(),
                                    doc.get("idChofer").toString(), doc.get("idProductor").toString(), doc.get("origen").toString(),
                                    doc.get("destino").toString(), doc.get("origenTexto").toString(), doc.get("destinoTexto").toString(),
                                    doc.get("ubicacionActual").toString(), doc.get("patente").toString(), doc.get("fechaInicio").toString(), doc.get("horaInicio").toString());
                            Bundle argss  = new Bundle();
                            argss.putSerializable("viaje", v);
                            fragmentDV.setArguments(argss);

                            final FragmentTransaction transaction3 = fragmentManager.beginTransaction();
                            transaction3.replace(R.id.main_container, fragmentDV).commit();
                        } else {
                            //final FragmentTransaction transaction = fragmentManager.beginTransaction();
                            //transaction.replace(R.id.main_container, fragmentCargando).commit();
                        }
                    } else {
                        //final FragmentTransaction transaction = fragmentManager.beginTransaction();
                        //transaction.replace(R.id.main_container, fragmentCargando).commit();
                    }
                }
            });
        }





    }

    public void setFragmentManager(FragmentManager fragmentManager) {
        this.fragmentManager = fragmentManager;
    }

    public void setPapa(ActivityPrincipal a){
        this.papa = a;
    }

}