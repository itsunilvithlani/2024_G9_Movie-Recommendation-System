import React from 'react';
import './style.scss';
import useFetch from '../../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from "dayjs";

import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

import PosterFallback from "../../../assets/no-poster.png";
import Avatar from "../../../assets/avatar.png";
import Genres from '../../../components/genres/Genres';

const PersonDetailsBanner = ({profile_path}) => {
    const { id } = useParams();
    const {data, loading} = useFetch(`/person/${id}`);
    const { url } = useSelector((state) => state.home.homeSlice);
    // const { movie_credits, loading_credits_movie} = useFetch(`/person/${id}/movie_credits`);
    // const { tv_credits, loading_credits_tv} = useFetch(`/person/${id}/tv_credits`);
    //const known_for = data?.known_for_department;

    return (
        <div className='personDetailsBanner'>
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>
                            <div>
                            <div className="backdrop-img">
                                    <Img src={url.backdrop + profile_path}/>
                                </div>
                            </div>
                            <div className="opacity-layer"></div>
                            <ContentWrapper>
                                <div className="content">
                                    <div className="left">
                                        {profile_path ? (
                                            <Img className="posterImg"
                                            src={url.backdrop + profile_path}/>
                                        ) : (
                                            <Img className="posterImg"
                                            src={Avatar}/>
                                        )}
                                    </div>
                                    <div className="right">
                                        <div className="title">
                                            {data.name}
                                        </div>
                                        <div className="known_as">
                                            {data?.also_known_as[0]}
                                        </div>
                                        {/* <Genres data={known_for }/> */}
                                        <div className="biography">
                                            <div className="heading">Biography</div>
                                            <div className="description">{data.biography}</div>
                                            <div className="info">
                                                {data.known_for_department && (
                                                    <div className="infoItem">
                                                        <span className="text bold">Known For: {" "}</span>
                                                        <span className="text">{data.known_for_department}</span>
                                                    </div>
                                                )}

                                                {data.gender && (
                                                    <div className="infoItem">
                                                        <span className="text bold">Gender: {" "}</span>
                                                        <span className="text">{(data.gender===1) ? "Female" : "Male"}</span>
                                                    </div>
                                                )}
                                                
                                            </div>
                                            <div className="info">
                                                {data.birthday && (
                                                    <div className="infoItem">
                                                        <span className="text bold">Birthday: {" "}</span>
                                                        <span className="text">{dayjs(data.birthday).format("MMM D, YYYY")}</span>
                                                    </div>
                                                )}

                                                {data.place_of_birth && (
                                                    <div className="infoItem">
                                                        <span className="text bold">Place of Birth: {" "}</span>
                                                        <span className="text">{data.place_of_birth}</span>
                                                    </div>
                                                )}

                                                {data.deathday && (
                                                    <div className="infoItem">
                                                        <span className="text bold">Death: {" "}</span>
                                                        <span className="text">{dayjs(data.deathday).format("MMM D, YYYY")}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </ContentWrapper>
                        </React.Fragment>
                    )}
                </>
            ) : (
                <div className="personDetailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default PersonDetailsBanner;