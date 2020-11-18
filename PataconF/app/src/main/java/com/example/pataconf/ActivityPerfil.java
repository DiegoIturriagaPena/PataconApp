package com.example.pataconf;

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
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.InstanceIdResult;

import java.util.ArrayList;
import java.util.List;

import Modelo.Notificacion;
import Modelo.Usuario;
import Modelo.Viaje;


public class ActivityPerfil extends Fragment {

    private EditText etnombre;
    private EditText etapellido;
    private EditText ettelefono;
    private EditText etcorreo;
    private EditText etpass;
    private FragmentManager fragmentManager;
    private Usuario user;


    public ActivityPerfil() {

    }
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {


        View rootView = inflater.inflate(R.layout.activity_profile, container, false);
        return inflater.inflate(R.layout.activity_profile, container, false);
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {

        Bundle args = getArguments();
        this.user = (Usuario) args.getSerializable("usuario");

        this.etnombre = view.findViewById(R.id.etnombre);
        this.etapellido = view.findViewById(R.id.etapellido);
        this.etcorreo = view.findViewById(R.id.etcorreo);
        this.ettelefono = view.findViewById(R.id.ettelefono);
        this.etpass = view.findViewById(R.id.etpass);

        this.etnombre.setText(user.getNombre());
        this.etapellido.setText(user.getApellido());
        this.etcorreo.setText(user.getCorreo());
        this.ettelefono.setText("+569"+user.getTelefono());


        this.etpass.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                LayoutCampo fragment = new LayoutCampo();
                Bundle args = new Bundle();
                args.putSerializable("usuario", user);
                args.putSerializable("title", "Contraseña nueva");
                args.putSerializable("value", "");
                fragment.setArguments(args);
                fragment.setFragmentManager(fragmentManager);
                final FragmentTransaction transaction4 = fragmentManager.beginTransaction();
                transaction4.replace(R.id.main_container, fragment).commit();
            }

        });

    }

    public void setFragmentManager(FragmentManager fragmentManager) {
        this.fragmentManager = fragmentManager;
    }
}