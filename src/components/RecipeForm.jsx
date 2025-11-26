import { useLanguage } from "@/lib/languageContext";
import { getCopy } from "@/lib/copy";

const RecipeForm = ({ onSubmit }) => {
  const { language } = useLanguage();
  const t = getCopy(language);
  const difficultyOptions =
    language === "de" ? ["leicht", "mittel", "schwer"] : ["easy", "moderate", "hard"];
  const durationOptions = ["15 min.", "30 min.", "45 min.", "60 min.", "90 min.", "120 min."];

  return (
    <div className="max-w-4xl mx-auto flex justify-center items-center px-4 sm:px-6">
      <form
        onSubmit={onSubmit}
        className="glass-surface border border-base-300/60 flex flex-col justify-center items-center w-full gap-3 sm:gap-4 m-6 p-6 sm:p-8 rounded-2xl"
      >
        <legend className="text-2xl font-semibold text-neutral text-center">
          {t.form.title}
        </legend>
        <p className="text-sm text-neutral/70 text-center mb-2">
          {t.form.subtitle}
        </p>
        <input
          name="name"
          id="name"
          type="text"
          placeholder={t.form.name}
          className="input input-bordered w-full max-w-xl"
          required
        />

        <input
          name="cuisine"
          id="cuisine"
          type="text"
          placeholder={t.form.cuisine}
          className="input input-bordered w-full max-w-xl"
        />
        <select
          defaultValue={t.form.difficulty}
          className="select select-bordered w-full max-w-xl"
          name="difficulty"
          id="difficulty"
        >
          <option disabled>{t.form.difficulty}</option>
          {difficultyOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>

        <select
          defaultValue={t.form.duration}
          className="select select-bordered w-full max-w-xl"
          name="timeInMinutes"
          id="timeInMinutes"
        >
          <option disabled>{t.form.duration}</option>
          {durationOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <select
          defaultValue={t.form.portions}
          className="select select-bordered w-full max-w-xl"
          name="portions"
          id="portions"
        >
          <option disabled>{t.form.portions}</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
        </select>

        <div className="w-full max-w-xl">
          <h3 className="text-lg font-semibold mb-3 text-neutral">
            {t.form.ingredients}
          </h3>
          <textarea
            name="ingredients"
            id="ingredients"
            rows={4}
            className="textarea textarea-bordered w-full max-w-xl"
            placeholder={t.form.placeholderIngredients}
          ></textarea>
        </div>
        <div className="w-full max-w-xl">
          <h3 className="text-lg font-semibold mb-3 text-neutral">
            {t.form.preparation}
          </h3>
          <textarea
            name="preparation"
            id="preparation"
            rows={4}
            className="textarea textarea-bordered w-full max-w-xl"
            placeholder={t.form.placeholderPreparation}
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-primary text-primary-content shadow-md shadow-primary/30 mt-2 w-full max-w-xl"
        >
          {t.form.submit}
        </button>
        <p className="text-sm text-neutral/70">
          {t.form.hint}
        </p>
      </form>
    </div>
  );
};

export default RecipeForm;
