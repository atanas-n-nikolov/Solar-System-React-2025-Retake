import { useFact } from '../../../api/factsAPI';
import ErrorNotification from '../../error/ErrorNotification';
import style from './FactOfTheDay.module.css';

export default function FactOfTheDay() {
    const { fact, error, loading } = useFact();

    if (loading) {
        return <div>Loading...</div>;
    };

    if (error) {
        return <ErrorNotification message={error} type="error" />;
    };

    if (!fact) {
        return <div>No fact for today available.</div>;
    };

    return (
        <article className={style.fact}>
            <div className={style.randomDay}>
                <div className={style.factHeader}>
                    <h2>
                        DID YOU KNOW<br />
                        ON THIS DAY ...
                    </h2>
                </div>
                <div className={style.factContent}>
                    <h3><span className={style.factsDescSmall}>IN:</span><span className={style.factsDescLarge}>{fact.year}</span></h3>
                    <p className={style.title}>
                        <span className={style.factsDescSmall}>THE:</span><span className={style.factsDescLarge}>{fact.title}</span>
                    </p>
                    <p className={style.description}>
                        <span className={style.factsDescSmall}>DESC:</span><span className={style.factsDescLarge}>{fact.description}</span>
                    </p>
                </div>
            </div>
        </article>
    );
};
