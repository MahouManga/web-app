import { getSeries, getSeriesRecently } from "@/services/serieService";
import InitialPage from "./InitialPage";
import Carousel from "@/components/Carousel";

type Trending = {
    [key: string]: any[];
};


export default async function Page() {
    const recently = await getSeriesRecently();

    const trending: Trending = {
        daily: recently.data || [],//await getTopSeries('daily', 10),
        week: recently.data || [],//await getTopSeries('weekly', 10),
        month: recently.data || [],//await getTopSeries('monthly', 10),
    };

    return (<>
        <Carousel autoSlide={true} autoSlideInterval={5000} slides={trending.daily} />
        <InitialPage trending={trending} recently={recently.data} slider={recently.data} />
    </>)
}