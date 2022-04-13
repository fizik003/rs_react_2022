import React, { ChangeEvent, FormEvent } from "react";
import { validators } from "utils";
import { ICardData } from "../../interfaces";

enum VALIDATE_MESSAGE {
  NO_EMPTY = "Поле не может быть пустым",
  MIN_LEN = "Минимальная длина",
  MAX_LEN = "Максимальная длина",
  YOUNG_MAN = "Вы слишком молоды",
}

interface IValidErrors {
  required: boolean;
  maxLength: boolean;
  minLength: boolean;
  empty: boolean;
  yang: boolean;
}

interface IField {
  errors: Partial<IValidErrors>;
}

interface IStateForm {
  firstName: IField;
  lastName: IField;
  bornDate: IField;
  animal: IField;
  smart: IField;
  nice: IField;
  sport: IField;
  sex: IField;
  photo: IField;
  acceptUse: IField;
}

interface IFormProps {
  addCard: (card: ICardData) => void;
}

class Form extends React.Component<IFormProps, IStateForm> {
  linkImg: string;

  firstName = React.createRef<HTMLInputElement>();

  acceptUse = React.createRef<HTMLInputElement>();

  animal = React.createRef<HTMLInputElement>();

  bornDate = React.createRef<HTMLInputElement>();

  female = React.createRef<HTMLInputElement>();

  lastName = React.createRef<HTMLInputElement>();

  male = React.createRef<HTMLInputElement>();

  nice = React.createRef<HTMLInputElement>();

  photo = React.createRef<HTMLInputElement>();

  smart = React.createRef<HTMLInputElement>();

  sport = React.createRef<HTMLInputElement>();

  isCanSubmit = false;

  constructor(props: IFormProps) {
    super(props);

    this.state = {
      acceptUse: { errors: {} },
      animal: { errors: {} },
      bornDate: { errors: {} },
      sex: { errors: {} },
      firstName: { errors: {} },
      lastName: { errors: {} },
      nice: { errors: {} },
      photo: { errors: {} },
      smart: { errors: {} },
      sport: { errors: {} },
    };
  }

  get isNoErrors() {
    return Object.values(this.state).every(
      (item) => !Object.keys(item.errors).length
    );
  }

  setError(fieldName: keyof IStateForm, errors: Partial<IValidErrors> = {}) {
    return this.setState<never>({
      [fieldName]: { errors },
    });
  }

  submit = (e: FormEvent) => {
    const { addCard } = this.props;
    e.preventDefault();
    this.validateFirstName();
    this.validateLastName();
    this.validateBornDate();
    this.validateSex();
    this.validatePhoto();

    setTimeout(() => {
      if (this.isNoErrors) {
        const data: ICardData = {
          firstName: this.firstName.current?.value,
          acceptUse: this.acceptUse.current?.value,
          animal: this.animal.current?.value,
          bornDate: new Date(this.bornDate.current!.value).valueOf(),
          sex: this.male.current?.checked ? "male" : "female",
          lastName: this.lastName.current?.value,
          nice: this.nice.current?.checked,
          photo: URL.createObjectURL(this.photo.current!.files![0]!),
          smart: this.smart.current?.checked,
          sport: this.sport.current?.checked,
        };

        addCard(data);
        // (e.currentTarget as HTMLFormElement).reset();
      }
    });
  };

  resetError = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.currentTarget.name as keyof IStateForm;
    this.setError(fieldName, {});
    if (!this.isCanSubmit) {
      this.isCanSubmit = true;
    }
  };

  validateFirstName() {
    const value = this.firstName.current?.value;

    if (validators.isEmpty(value)) {
      return this.setError("firstName", { empty: true });
    }

    if (value && validators.minLength(value, 3)) {
      return this.setError("firstName", { minLength: true });
    }

    return this.setError("firstName", undefined);
  }

  validateLastName() {
    const value = this.lastName.current?.value;
    const { minLength, isEmpty } = validators;

    if (isEmpty(value)) return this.setError("lastName", { empty: true });
    if (value && minLength(value, 5))
      return this.setError("lastName", { minLength: true });

    return this.setError("lastName", undefined);
  }

  validateBornDate() {
    const value = this.bornDate.current?.value;
    const maxDate = new Date(2010, 1, 1).valueOf();
    const date = value ? new Date(value).valueOf() : Date.now().valueOf();
    if (validators.isEmpty(value))
      return this.setError("bornDate", { empty: true });

    if (validators.checkOld(date, maxDate))
      return this.setError("bornDate", { yang: true });

    return this.setError("bornDate", undefined);
  }

  validateSex() {
    const isMale = this.male.current?.checked;
    const isFemale = this.female.current?.checked;
    if (!isMale && !isFemale) return this.setError("sex", { empty: true });

    return this.setError("sex", undefined);
  }

  validatePhoto() {
    const files = this.photo.current?.files;
    if (!(files && files[0])) return this.setError("photo", { empty: true });

    return this.setError("photo", undefined);
  }

  render() {
    const { firstName, lastName, bornDate, sex, photo } = this.state;
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-gray-300 p-6 rounded-md max-w-lg w-full ">
          <form
            className="flex flex-col gap-5"
            onSubmit={this.submit}
            onChange={() => {
              this.isCanSubmit = true;
            }}
          >
            <div className="relative">
              <label htmlFor="firstName" className="flex flex-col">
                <span className="mb-1">Введите ваше имя</span>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  ref={this.firstName}
                  className="p-2 outline-none"
                  onChange={this.resetError}
                />
              </label>
              {firstName.errors?.empty && (
                <span className="text-red-600 font-light text-xs flex absolute">
                  {VALIDATE_MESSAGE.NO_EMPTY}
                </span>
              )}
              {firstName.errors?.minLength && (
                <span className="text-red-600 font-light text-xs flex absolute">
                  {VALIDATE_MESSAGE.MIN_LEN} 3
                </span>
              )}
            </div>

            <div className="relative">
              <label htmlFor="lastName" className="flex flex-col">
                <span className="mb-1">Введите вашу фамилию</span>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  ref={this.lastName}
                  className="p-2 outline-none"
                  onChange={this.resetError}
                />
              </label>
              {lastName.errors?.empty && (
                <span className="text-red-600 font-light text-xs flex absolute">
                  {VALIDATE_MESSAGE.NO_EMPTY}
                </span>
              )}
              {lastName.errors?.minLength && (
                <span className="text-red-600 font-light text-xs flex absolute">
                  {VALIDATE_MESSAGE.MIN_LEN} 5
                </span>
              )}
            </div>

            <div className="relative">
              <label htmlFor="bornDate" className="flex flex-col">
                <span className="mb-1">Укажите дату рождения</span>
                <input
                  type="date"
                  name="bornDate"
                  id="bornDate"
                  ref={this.bornDate}
                  className="p-2 outline-none"
                  onChange={this.resetError}
                />
              </label>
              {bornDate.errors?.empty && (
                <span className="text-red-600 font-light text-xs flex absolute">
                  {VALIDATE_MESSAGE.NO_EMPTY}
                </span>
              )}
              {bornDate.errors?.yang && (
                <span className="text-red-600 font-light text-xs flex absolute">
                  {VALIDATE_MESSAGE.YOUNG_MAN}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="animal" className="flex flex-col">
                <span className="mb-1">Выберите любимое животное</span>
                <select name="animal" id="animal" className="p-2">
                  <option value="cat">Кот</option>
                  <option value="dog">Собока</option>
                </select>
              </label>
            </div>

            <div className="flex space-x-4 border-2 p-1">
              <div>
                <label htmlFor="smart" className="flex items-center">
                  <span className="mr-1">Умный</span>
                  <input
                    name="smart"
                    type="checkbox"
                    id="smart"
                    className="p-2 outline-none"
                  />
                </label>
              </div>

              <div>
                <label htmlFor="nice" className="flex items-center">
                  <span className="mr-1">Красивый</span>
                  <input
                    name="nice"
                    type="checkbox"
                    id="nice"
                    className="p-2 outline-none"
                  />
                </label>
              </div>

              <div>
                <label htmlFor="sport" className="flex items-center">
                  <span className="mr-1">Спортивный</span>
                  <input
                    name="sport"
                    type="checkbox"
                    id="sport"
                    className="p-2 outline-none"
                  />
                </label>
              </div>
            </div>

            <div className="relative">
              <div className="border-2 p-1">
                <p className="mb-2">Выберите пол</p>
                <div className="flex space-x-4">
                  <label htmlFor="male" className="flex items-center">
                    <span className="mr-2">Мужчина</span>
                    <input
                      type="radio"
                      id="male"
                      className="p-2 outline-none"
                      name="sex"
                      ref={this.male}
                      onChange={this.resetError}
                    />
                  </label>
                  <label htmlFor="female" className="flex items-center">
                    <span className="mr-2">Женщина</span>
                    <input
                      type="radio"
                      id="female"
                      className="p-2 outline-none"
                      name="sex"
                      ref={this.female}
                      onChange={this.resetError}
                    />
                  </label>
                </div>
              </div>
              {sex.errors?.empty && (
                <span className="text-red-600 font-light text-xs flex absolute">
                  {VALIDATE_MESSAGE.NO_EMPTY}
                </span>
              )}
            </div>

            <div className="relative">
              <label htmlFor="photo" className="flex flex-col">
                <span className="mb-1">Загрузите ваше фото</span>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  ref={this.photo}
                  accept="image/png, image/gif, image/jpeg"
                  onChange={this.resetError}
                />
              </label>
              {photo.errors?.empty && (
                <span className="text-red-600 font-light text-xs flex absolute">
                  {VALIDATE_MESSAGE.NO_EMPTY}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="acceptUse" className="flex items-center">
                <span className="mr-1">Согласеие на использование данных</span>
                <input
                  type="checkbox"
                  id="acceptUse"
                  className="p-2 outline-none"
                  name="acceptUse"
                />
              </label>
            </div>

            <button
              type="submit"
              className="bg-white w-fit p-2 disabled:opacity-50"
              disabled={!(this.isCanSubmit && this.isNoErrors)}
            >
              Отправить
            </button>
          </form>
        </div>
        <img src={this.linkImg} alt="" />
      </div>
    );
  }
}

export default Form;
