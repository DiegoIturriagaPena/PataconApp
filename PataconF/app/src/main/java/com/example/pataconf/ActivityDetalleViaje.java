package com.example.pataconf;

import android.content.Intent;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.support.annotation.NonNull;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.widget.CardView;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.Query;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;

import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;
import java.util.logging.Handler;

import Modelo.Notificacion;
import Modelo.Viaje;

public class ActivityDetalleViaje extends Fragment implements View.OnClickListener {

    private TextView origen;
    private TextView destino;
    private TextView horaTermino;

    private TextView chofer;
    private TextView rut;
    private TextView patente;
    private ProgressBar progressBar;
    private TextView estado;
    private static boolean isTimerRunning;
    private static Timer timer;
    private static int elapsedTime = 0;
    private String numero;
    private TextView cron;
    private LinearLayout op2;
    private TextView viaje;
    private ActivityPrincipal papa;
    private Button volver;
    private String origenn;

    public ActivityDetalleViaje() {
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.activity_detalleviaje, container, false);
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {


        Bundle args = getArguments();
        Viaje viaje = (Viaje) args.getSerializable("viaje");

        this.origen = view.findViewById(R.id.torigen);
        this.destino = view.findViewById(R.id.tdestino);
        this.horaTermino = view.findViewById(R.id.thora);

        this.chofer = view.findViewById(R.id.tchofer);
        this.rut = view.findViewById(R.id.trut);
        this.patente = view.findViewById(R.id.tpatente);
        this.op2 = view.findViewById(R.id.op2);

        this.origen.setText(viaje.getOrigenTexto());
        this.destino.setText(viaje.getDestinoTexto());
        this.horaTermino.setText("21:30");

        this.volver = view.findViewById(R.id.buttonVolver);
        this.volver.setOnClickListener(this);

        FirebaseFirestore db = FirebaseFirestore.getInstance();
        DocumentReference docRef = db.collection("chofer").document(viaje.getIdChofer());
        docRef.get().addOnCompleteListener(new OnCompleteListener<DocumentSnapshot>() {
            @Override
            public void onComplete(@NonNull Task<DocumentSnapshot> task) {
                if (task.isSuccessful()) {
                    DocumentSnapshot document = task.getResult();
                    if (document.exists()) {
                        chofer.setText(document.get("nombre").toString() + " " + document.get("apellido").toString());
                        numero = document.get("numero").toString();
                    } else {

                    }
                } else {

                }
            }
        });

        rut.setText(viaje.getIdChofer());
        this.patente.setText(viaje.getPatente());

        this.cron = view.findViewById(R.id.cron);

        this.estado = view.findViewById(R.id.testado);

        if (viaje.getEstado().compareTo("Pendiente")==0){
            this.estado.setText("Despacho Planificado\n"+viaje.getFecha() + " " + viaje.getHora());
            ViewGroup.LayoutParams params = op2.getLayoutParams();
            op2.setVisibility(View.INVISIBLE);
            cron.setText("");
        }
        else {
            this.estado.setText("Camión " + viaje.getEstado());
            LinearLayout opc2 = (LinearLayout) view.findViewById(R.id.op2);
            opc2.setOnClickListener(this);

            new CountDownTimer(20000, 1000) {

                public void onTick(long millisUntilFinished) {
                    cron.setText("Se actualizará en " + millisUntilFinished / 1000 + " segundos");
                }

                public void onFinish() {
                    cron.setText("Actualizar ahora");
                }
            }.start();
        }





    }


    @Override
    public void onClick(View v) {
        if (v.getId()==R.id.op2){
            try {
                startActivity(new Intent(Intent.ACTION_DIAL, Uri.parse(numero)));
            }
            catch (Exception e){
                startActivity(new Intent(Intent.ACTION_DIAL, Uri.parse("tel:+56956844862")));
            }

        }
        else if (v == this.volver){
            if (this.origenn.compareTo("curso")==0)
                this.papa.actualizarFragmentCurso();
            else if (this.origenn.compareTo("finalizado")==0){
                this.papa.actualizarFragmentFinalizado();
            }
            else {
                this.papa.actualizarFragmentPlanificado();
            }
        }
    }


    public void setPapa(ActivityPrincipal a){
        this.papa = a;
    }

    public void setOrigen(String origen){
        this.origenn = origen;
    }

}