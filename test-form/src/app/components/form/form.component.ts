import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

// Função de validação personalizada para a senha
function senhaValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const senha = control.value;

  // Verifique se a senha tem pelo menos 8 caracteres
  if (senha && senha.length < 8) {
    return { minLength: true };
  }

  // Verifique se a senha tem pelo menos 2 caracteres especiais
  const caracteresEspeciais = senha.match(/[!@#$%^&*(),.?":{}|<>]/g) || [];
  if (caracteresEspeciais.length < 2) {
    return { minSpecialChars: true };
  }

  // Se a senha atender aos requisitos, retorne null (sem erro)
  return null;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  form_Login: FormGroup;
  errorMsgEmail: string = '';
  errorMsgSenha: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form_Login = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', senhaValidator],
    });
  }

  ngOnInit(): void {}

  validarEmail() {
    this.form_Login.get('email')?.updateValueAndValidity();

    if (this.form_Login.get('email')?.valid) {
      // Se o e-mail for válido, resete as flags hasError e dirty
      this.form_Login.get('email')?.setErrors(null);
      this.form_Login.get('email')?.markAsPristine();

      // Remova as mensagens de erro
      this.errorMsgEmail = '';
    }
    if (
      this.form_Login.get('email')?.hasError('required') &&
      this.form_Login.get('email')?.dirty
    ) {
      this.errorMsgEmail = 'O email é obrigatorio';
    }

    if (
      this.form_Login.get('email')?.hasError('email') &&
      this.form_Login.get('email')?.dirty
    ) {
      this.errorMsgEmail = 'Informe um e-mail com formato válido';
    }
  }

  validarSenha() {
    // Força a validação ao modificar o valor da senha
    this.form_Login.get('senha')?.updateValueAndValidity();

    console.log(!this.form_Login.get('senha')?.dirty);
    if (this.form_Login.get('senha')?.valid) {
      // Se a senha for válida, resete as flags hasError e dirty
      this.form_Login.get('senha')?.setErrors(null);
      this.form_Login.get('senha')?.markAsPristine();

      // Remova as mensagens de erro
      this.errorMsgSenha = '';
    }
    if (
      this.form_Login.get('senha')?.hasError('minLength') &&
      this.form_Login.get('senha')?.dirty
    ) {
      this.errorMsgSenha = 'A senha deve ter pelo menos 8 caracteres.';
    }
    if (
      this.form_Login.get('senha')?.hasError('minSpecialChars') &&
      this.form_Login.get('senha')?.dirty
    ) {
      this.errorMsgSenha =
        'A senha deve conter pelo menos dois caracteres especiais';
    }
  }

  submitForm() {
    if (this.form_Login.valid) {
      console.log(this.form_Login.get('email')?.value);

      let res = this.auth.login(
        this.form_Login.get('email')?.value,
        this.form_Login.get('senha')?.value
      );
      if (res === 200) {
        this.router.navigate(['home']);
      }
    }
    // Lógica para lidar com o envio do formulário
    console.log(this.form_Login.value);
  }
}
