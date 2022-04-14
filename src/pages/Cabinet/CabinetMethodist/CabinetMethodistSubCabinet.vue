<template>

    <main class="content content_cabinet">
		<section class="page__section">
			<!-- <ul class="breadcrumbs page__breadcrumbs">
				<li class="breadcrumbs__item">
					<a href="#" class="breadcrumbs__link">мероприятия</a>
				</li>
				<li class="breadcrumbs__item">
					<a href="#" class="breadcrumbs__link">создать мероприятие</a>
				</li>
				<li class="breadcrumbs__item">
					<span href="#" class="breadcrumbs__link breadcrumbs__link_current">«Мастер-класс как эффективная форма повышения профессионального мастерства педагогов»</span>
				</li>
			</ul>		 -->
			<h1 class="section-title mb-50">Предметные кабинеты</h1>
			<div class="wrapper wrapper--width cabinet">				
				<div class="cabinet-radio box-radio">
					<label class="wr-radio">
						<input type="radio" name="Предметные кабинеты" value="Начальное общее образование" class="real-radio" checked>
						<span class="custom-radio"></span>
						<span class="text-radio">Начальное общее образование</span>
					</label>
					<label class="wr-radio">
						<input type="radio" name="Предметные кабинеты" value="Основное общее образование" class="real-radio">
						<span class="custom-radio"></span>
						<span class="text-radio">Основное общее образование</span>
					</label>
					<label class="wr-radio">
						<input type="radio" name="Предметные кабинеты" value="Среднее общее образование" class="real-radio">
						<span class="custom-radio"></span>
						<span class="text-radio">Среднее общее образование</span>
					</label>
				</div>				
				<div class="profile_tabs-form__line cabinet-select form__item">
					<label for="reportsEducational" class="form__label">Тип новости</label>
					<select name="reportsEducational" class="two">
						<option value="1" selected>Выберите тип новости</option>
						<option value="2">Пункт №2</option>
						<option value="3">Пункт №3</option>
						<option value="4">Пункт №4</option>
					</select>
				</div>				
				<div class="cabinet__accordion accordion">
					<div class="cabinet__inner-checkbox">					
						<label class="wr-checkbox">
							<input type="checkbox" name="coding-notes" class="real-checkbox">
							<span class="custom-checkbox"></span>
							<span class="text-checkbox">Выбрать несколько</span>
						</label>					
					</div>
					<div class="accordion__item" data-akkardion>
						Нормативные правовые документы						
					</div>
					<div class="accordion__item-hidden hidden">								
						<ol class="events-content__item-list">
							<li class="events-content__item-box">
								<a href="#" class="events-content__item-box-link">Федеральный закон «Об образовании в Российской Федерации» <nobr>(.ppt 7,6 MБ)</nobr></a>
								<div class="events-content__item-box-icons form__item-btn form__item-btn--row">
									<div class="form__item-down"></div>
									<div class="form__item-send"></div>
								</div>
							</li>
							<li class="events-content__item-box">								
								<a href="#" class="events-content__item-box-link">Федеральные государственные образовательные стандарты начального общего, основного общего и среднего общего образования<nobr>(.ppt 511 КБ)</nobr></a>
								<div class="events-content__item-box-icons form__item-btn form__item-btn--row">
									<div class="form__item-down"></div>
									<div class="form__item-send"></div>
								</div>
							</li>
							<li class="events-content__item-box">
								<a href="#" class="events-content__item-box-link">Федеральный перечень учебников<nobr>(.doc 33 КБ)</nobr></a>
								<div class="events-content__item-box-icons form__item-btn form__item-btn--row">
									<div class="form__item-down"></div>
									<div class="form__item-send"></div>
								</div>
							</li>
						</ol>													
					</div>
					<div class="accordion__item" data-akkardion>
						Образовательные ресурсы для методистов и педагогов (методические рекомендации, кейсы, инструкции, технологические карты и др.)						
					</div>
					<div class="accordion__item-hidden hidden">								
						<ol class="events-content__item-list">
							<li class="events-content__item-box">
								<a href="#" class="events-content__item-box-link">Федеральный закон «Об образовании в Российской Федерации» <nobr>(.ppt 7,6 MБ)</nobr></a>
								<div class="events-content__item-box-icons form__item-btn form__item-btn--row">
									<div class="form__item-down"></div>
									<div class="form__item-send"></div>
								</div>
							</li>
							<li class="events-content__item-box">
								<a href="#" class="events-content__item-box-link">Федеральные государственные образовательные стандарты начального общего, основного общего и среднего общего образования<nobr>(.ppt 511 КБ)</nobr></a>
								<div class="events-content__item-box-icons form__item-btn form__item-btn--row">
									<div class="form__item-down"></div>
									<div class="form__item-send"></div>
								</div>
							</li>
							<li class="events-content__item-box">
								<a href="#" class="events-content__item-box-link">Федеральный перечень учебников<nobr>(.doc 33 КБ)</nobr></a>
								<div class="events-content__item-box-icons form__item-btn form__item-btn--row">
									<div class="form__item-down"></div>
									<div class="form__item-send"></div>
								</div>
							</li>
						</ol>													
					</div>
					<div class="accordion__item" data-akkardion>
						Формы методического сопровождения (семинары, вебинары, конференции, круглые столы и т.п.)						
					</div>
					<div class="accordion__item-hidden hidden">								
						<ol class="events-content__item-list">
							<li class="events-content__item-box">
								<a href="#" class="events-content__item-box-link">Федеральный закон «Об образовании в Российской Федерации» <nobr>(.ppt 7,6 MБ)</nobr></a>
								<div class="events-content__item-box-icons form__item-btn form__item-btn--row">
									<div class="form__item-down"></div>
									<div class="form__item-send"></div>
								</div>
							</li>
							<li class="events-content__item-box">
								<a href="#" class="events-content__item-box-link">Федеральные государственные образовательные стандарты начального общего, основного общего и среднего общего образования<nobr>(.ppt 511 КБ)</nobr></a>
								<div class="events-content__item-box-icons form__item-btn form__item-btn--row">
									<div class="form__item-down"></div>
									<div class="form__item-send"></div>
								</div>
							</li>
							<li class="events-content__item-box">
								<a href="#" class="events-content__item-box-link">Федеральный перечень учебников<nobr>(.doc 33 КБ)</nobr></a>
								<div class="events-content__item-box-icons form__item-btn form__item-btn--row">
									<div class="form__item-down"></div>
									<div class="form__item-send"></div>
								</div>
							</li>
						</ol>													
					</div>
					<div class="accordion__item" data-akkardion>
						Методическое сопровождение формирования функциональной грамотности					
					</div>
					<div class="accordion__item-hidden hidden">								
						<ol class="events-content__item-list">
							<li class="events-content__item-box">
								<a href="#" class="events-content__item-box-link">Федеральный закон «Об образовании в Российской Федерации» <nobr>(.ppt 7,6 MБ)</nobr></a>
								<div class="events-content__item-box-icons form__item-btn form__item-btn--row">
									<div class="form__item-down"></div>
									<div class="form__item-send"></div>
								</div>
							</li>
							<li class="events-content__item-box">
								<a href="#" class="events-content__item-box-link">Федеральные государственные образовательные стандарты начального общего, основного общего и среднего общего образования<nobr>(.ppt 511 КБ)</nobr></a>
								<div class="events-content__item-box-icons form__item-btn form__item-btn--row">
									<div class="form__item-down"></div>
									<div class="form__item-send"></div>
								</div>
							</li>
							<li class="events-content__item-box">
								<a href="#" class="events-content__item-box-link">Федеральный перечень учебников<nobr>(.doc 33 КБ)</nobr></a>
								<div class="events-content__item-box-icons form__item-btn form__item-btn--row">
									<div class="form__item-down"></div>
									<div class="form__item-send"></div>
								</div>
							</li>
						</ol>													
					</div>
					<div class="accordion__item" data-akkardion>
						Методическое сопровождение введения обновлённых ФГОС начального общего и основного общего образования					
					</div>
					<div class="accordion__item-hidden hidden">								
						<ol class="events-content__item-list">
							<li class="events-content__item-box">
								<a href="#" class="events-content__item-box-link">Федеральный закон «Об образовании в Российской Федерации» <nobr>(.ppt 7,6 MБ)</nobr></a>
								<div class="events-content__item-box-icons form__item-btn form__item-btn--row">
									<div class="form__item-down"></div>
									<div class="form__item-send"></div>
								</div>
							</li>
							<li class="events-content__item-box">
								<a href="#" class="events-content__item-box-link">Федеральные государственные образовательные стандарты начального общего, основного общего и среднего общего образования<nobr>(.ppt 511 КБ)</nobr></a>
								<div class="events-content__item-box-icons form__item-btn form__item-btn--row">
									<div class="form__item-down"></div>
									<div class="form__item-send"></div>
								</div>
							</li>
							<li class="events-content__item-box">
								<a href="#" class="events-content__item-box-link">Федеральный перечень учебников<nobr>(.doc 33 КБ)</nobr></a>
								<div class="events-content__item-box-icons form__item-btn form__item-btn--row">
									<div class="form__item-down"></div>
									<div class="form__item-send"></div>
								</div>
							</li>
						</ol>													
					</div>
					<div class="accordion__item" data-akkardion>
						Банки контрольно-измерительных материалов, диагностических материалов, проверочных заданий					
					</div>
					<div class="accordion__item-hidden hidden">								
						<ol class="events-content__item-list">
							<li class="events-content__item-box">
								<a href="#" class="events-content__item-box-link">Федеральный закон «Об образовании в Российской Федерации» <nobr>(.ppt 7,6 MБ)</nobr></a>
								<div class="events-content__item-box-icons form__item-btn form__item-btn--row">
									<div class="form__item-down"></div>
									<div class="form__item-send"></div>
								</div>
							</li>
							<li class="events-content__item-box">
								<a href="#" class="events-content__item-box-link">Федеральные государственные образовательные стандарты начального общего, основного общего и среднего общего образования<nobr>(.ppt 511 КБ)</nobr></a>
								<div class="events-content__item-box-icons form__item-btn form__item-btn--row">
									<div class="form__item-down"></div>
									<div class="form__item-send"></div>
								</div>
							</li>
							<li class="events-content__item-box">
								<a href="#" class="events-content__item-box-link">Федеральный перечень учебников<nobr>(.doc 33 КБ)</nobr></a>
								<div class="events-content__item-box-icons form__item-btn form__item-btn--row">
									<div class="form__item-down"></div>
									<div class="form__item-send"></div>
								</div>
							</li>
						</ol>													
					</div>
					<div class="accordion__item" data-akkardion>
						Внеурочная деятельность						
					</div>
					<div class="accordion__item-hidden hidden">								
						<ol class="events-content__item-list">
							<li class="events-content__item-box">
								<a href="#" class="events-content__item-box-link">Федеральный закон «Об образовании в Российской Федерации» <nobr>(.ppt 7,6 MБ)</nobr></a>
								<div class="events-content__item-box-icons form__item-btn form__item-btn--row">
									<div class="form__item-down"></div>
									<div class="form__item-send"></div>
								</div>
							</li>
							<li class="events-content__item-box">
								<a href="#" class="events-content__item-box-link">Федеральные государственные образовательные стандарты начального общего, основного общего и среднего общего образования<nobr>(.ppt 511 КБ)</nobr></a>
								<div class="events-content__item-box-icons form__item-btn form__item-btn--row">
									<div class="form__item-down"></div>
									<div class="form__item-send"></div>
								</div>
							</li>
							<li class="events-content__item-box">
								<a href="#" class="events-content__item-box-link">Федеральный перечень учебников<nobr>(.doc 33 КБ)</nobr></a>
								<div class="events-content__item-box-icons form__item-btn form__item-btn--row">
									<div class="form__item-down"></div>
									<div class="form__item-send"></div>
								</div>
							</li>
						</ol>													
					</div>
					<div class="accordion__item" data-akkardion>
						Библиотека (информационные материалы, полезные ресурсы, ссылки и др.)					
					</div>
					<div class="accordion__item-hidden hidden">								
						<ol class="events-content__item-list">
							<li class="events-content__item-box">
								<a href="#" class="events-content__item-box-link">Федеральный закон «Об образовании в Российской Федерации» <nobr>(.ppt 7,6 MБ)</nobr></a>
								<div class="events-content__item-box-icons form__item-btn form__item-btn--row">
									<div class="form__item-down"></div>
									<div class="form__item-send"></div>
								</div>
							</li>
							<li class="events-content__item-box">
								<a href="#" class="events-content__item-box-link">Федеральные государственные образовательные стандарты начального общего, основного общего и среднего общего образования<nobr>(.ppt 511 КБ)</nobr></a>
								<div class="events-content__item-box-icons form__item-btn form__item-btn--row">
									<div class="form__item-down"></div>
									<div class="form__item-send"></div>
								</div>
							</li>
							<li class="events-content__item-box">
								<a href="#" class="events-content__item-box-link">Федеральный перечень учебников<nobr>(.doc 33 КБ)</nobr></a>
								<div class="events-content__item-box-icons form__item-btn form__item-btn--row">
									<div class="form__item-down"></div>
									<div class="form__item-send"></div>
								</div>
							</li>
						</ol>													
					</div>
				</div>							
			</div>		   
		</section>
    </main>
</template>
