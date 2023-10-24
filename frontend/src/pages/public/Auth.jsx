/*import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: ""
}

const Auth = ({setActive, setUser}) => {
  const [state, setState] = useState(initialState);
  const [signUp, setSignUP] = useState(false);
  const {email, password, firstName, lastName, confirmPassword} = state;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({...state, [e.target.name]: e.target.value})
  }

  const handleAuth = async (e) => {
    e.preventDefault();
    if(!signUp) {
      if (email && password) {
        const {user} = await signInWithEmailAndPassword(auth, email, password);
        setUser(user);
        setActive("home");
      } else {
        return toast.error("Tous les champs sont à remplir obligatoirement");
      }
    } else {
      if (password !== confirmPassword) {
        return toast.error("Le mot de passe ne correspond pas");
      }
      if (firstName && lastName && email && password) {
        const {user} = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(user, {displayName: `${firstName} ${lastName}`});
        setActive("home");
      } else {
        return toast.error("Tous les champs sont à remplir obligatoirement");
      }
    }
    navigate("/");
  }

  return (
    <div className='flex-content'>
      <div className="container-fluid mb-4">
        <div className="container">
          <div className="col-12 text-center">
            <div className="text-center heading py-2">
              {!signUp ? "S'identifier" : "S'inscrire"}
            </div>
          </div>
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-10 col-md-8 col-lg-6">
              <form className="row" onSubmit={handleAuth}>
                {signUp && (
                  <>
                    <div className="col-6 py-3">
                      <input type="text" className='form-control input-text-box' placeholder='Prénom' name='firstName' value={firstName} onChange={handleChange} />
                    </div>
                    <div className="col-6 py-3">
                      <input type="text" className='form-control input-text-box' placeholder='Nom' name='lastName' value={lastName} onChange={handleChange} />
                    </div>
                  </>
                )}
                <div className="col-12 py-3">
                  <input type="email" className='form-control input-text-box' placeholder='Email' name='email' value={email} onChange={handleChange} />
                </div>
                <div className="col-12 py-3">
                  <input type="password" className='form-control input-text-box' placeholder='Mot de passe' name='password' value={password} onChange={handleChange} />
                </div>
                {signUp && (
                  <div className="col-12 py-3">
                    <input type="password" className='form-control input-text-box' placeholder='Confirmer le mot de passe' name='confirmPassword' value={confirmPassword} onChange={handleChange} />
                  </div>
                )}
                <div className="col-12 py-3 text-center">
                  <button className={`btn ${!signUp ? "btn-sign-in" : "btn-sign-up"}`} type="submit" >
                    {!signUp ? "S'identifier" : "S'inscrire"}
                  </button>
                </div>
              </form>
              <div>
                {!signUp ? (
                  <>
                    <div className="text-center justify-content-center mt-2 pt-2">
                      <p className="small fw-bold mt-2 pt-1 mb-0">
                        Vous n'avez pas de compte ?&nbsp;
                        <span className="link-danger" style={{textDecoration: "none", cursor: "pointer"}} onClick={() => setSignUP(true)}>
                          S'inscrire
                        </span>
                      </p>
                    </div>
                  </>
                ): (
                  <>
                    <div className="text-center justify-content-center mt-2 pt-2">
                      <p className="small fw-bold mt-2 pt-1 mb-0">
                        Vous avez déjà un compte ?&nbsp;
                        <span style={{textDecoration: "none", cursor: "pointer", color: "#298af2"}} onClick={() => setSignUP(false)}>
                          S'identifier
                        </span>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth*/

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: ""
}

const Auth = ({ setActive, setUser }) => {
  const [state, setState] = useState(initialState);
  const [signUp, setSignUp] = useState(false);
  const { email, password, firstName, lastName, confirmPassword } = state;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!signUp) {
      if (email && password) {
        try {
          const { user } = await signInWithEmailAndPassword(auth, email, password);
          setUser(user);
          setActive("auth");
        } catch (error) {
          toast.error("Identifiants incorrects. Veuillez réessayer ou réinitialiser votre mot de passe.");
          setState(initialState);
        }
      } else {
        toast.error("Tous les champs sont à remplir obligatoirement");
      }
    } else {
      if (password !== confirmPassword) {
        toast.error("Le mot de passe ne correspond pas");
      } else if (firstName && lastName && email && password) {
        try {
          const { user } = await createUserWithEmailAndPassword(auth, email, password);
          await updateProfile(user, { displayName: `${firstName} ${lastName}` });
          setUser(user);
          setActive("auth");
        } catch (error) {
          toast.error("Une erreur s'est produite lors de la création de l'utilisateur.");
        }
      } else {
        toast.error("Tous les champs sont à remplir obligatoirement");
      }
    }
    navigate("/");
  }

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        toast.success("Un e-mail de réinitialisation de mot de passe a été envoyé.");
      } catch (error) {
        toast.error("Une erreur s'est produite lors de l'envoi de l'e-mail de réinitialisation de mot de passe.");
      }
    } else {
      toast.error("Veuillez entrer votre adresse e-mail.");
    }
  };

  return (
    <div className='flex-content'>
      <div className="container-fluid mb-4">
        <div className="container">
          <div className="col-12 text-center">
            <div className="text-center heading py-2">
              {!signUp ? "S'identifier" : "S'inscrire"}
            </div>
          </div>
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-10 col-md-8 col-lg-6">
              <form className="row" onSubmit={handleAuth}>
                {signUp && (
                  <>
                    <div className="col-6 py-3">
                      <input type="text" className='form-control input-text-box' placeholder='Prénom' name='firstName' value={firstName} onChange={handleChange} />
                    </div>
                    <div className="col-6 py-3">
                      <input type="text" className='form-control input-text-box' placeholder='Nom' name='lastName' value={lastName} onChange={handleChange} />
                    </div>
                  </>
                )}
                <div className="col-12 py-3">
                  <input type="email" className='form-control input-text-box' placeholder='Email' name='email' value={email} onChange={handleChange} />
                </div>
                <div className="col-12 py-3">
                  <input type="password" className='form-control input-text-box' placeholder='Mot de passe' name='password' value={password} onChange={handleChange} />
                </div>
                {signUp && (
                  <div className="col-12 py-3">
                    <input type="password" className='form-control input-text-box' placeholder='Confirmer le mot de passe' name='confirmPassword' value={confirmPassword} onChange={handleChange} />
                  </div>
                )}
                <div className="col-12 py-3 text-center">
                  <button className={`btn ${!signUp ? "btn-sign-in" : "btn-sign-up"}`} type="submit" >
                    {!signUp ? "S'identifier" : "S'inscrire"}
                  </button>
                </div>
                {!signUp && (
                  <div className="col-12 py-3 text-center">
                    <button
                      className="btn btn-link"
                      onClick={handleResetPassword}
                    >
                      Mot de passe oublié ?
                    </button>
                  </div>
                )}
              </form>
              <div>
                {!signUp ? (
                  <>
                    <div className="text-center justify-content-center mt-2 pt-2">
                      <p className="small fw-bold mt-2 pt-1 mb-0">
                        Vous n'avez pas de compte ?&nbsp;
                        <span className="link-danger" style={{ textDecoration: "none", cursor: "pointer" }} onClick={() => setSignUp(true)}>
                          S'inscrire
                        </span>
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-center justify-content-center mt-2 pt-2">
                      <p className="small fw-bold mt-2 pt-1 mb-0">
                        Vous avez déjà un compte ?&nbsp;
                        <span style={{ textDecoration: "none", cursor: "pointer", color: "#298af2" }} onClick={() => setSignUp(false)}>
                          S'identifier
                        </span>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth;
