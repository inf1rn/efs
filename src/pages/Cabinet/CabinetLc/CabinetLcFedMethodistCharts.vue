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
			<h1 class="section-title mb-50">Статистика по методистам</h1>
			<div class="wrapper wrapper--width1265 cabinet">
				<div class="tabs profile__tabs _tabs">
                    <nav class="tabs__navigation">
                        <button type="submit" class="tabs__title _tabs-item ">Статистика</button>
                        <button type="submit" class="tabs__title _tabs-item _active">Графики</button>
                    </nav>
                    <div class="tabs__content">
                        <div class="tabs__body _tabs-block ">
							
                        </div>
                        <div class="tabs__body _tabs-block _active">
							<div class="chart">
								<div class="chart__holder chart-line">
									<div class="chart-line__top chart-top">
										<h3 class="chart-top__title title3">Квартальный отчет</h3>
										<div class="chart-top__select">
											<div class="select-form select-form--height38 select-form-border">												
												<select name="listenersRegion" class="two">
													<option value="1" selected>Консультации</option>
													<option value="2">Пункт №1</option>
													<option value="3">Пункт №3</option>
													<option value="4">Пункт №4</option>													
												</select>
											</div>
										</div>
									</div>
									<div class="chart-line__wr">
										<div class="chart-line__canvas">
											<canvas id="myLine" width="900" height="300"></canvas>
										</div>
										<div class="chart-line__checkbox choice">									
											<div class="choice-item choice-item--mb">
												<div class="choice-item__checkbox checkbox form-group form-group--purple">
													<input type="checkbox" id="chk-purple">
													<label for="chk-purple">
														<span class="choice-item__text">Москва</span>
													</label>
												</div>						
											</div>											
											<div class="choice-item choice-item--mb">
												<div class="choice-item__checkbox checkbox form-group form-group--blue">
													<input type="checkbox" id="chk-blue">
													<label for="chk-blue">
														<span class="choice-item__text">Санкт-Питербург</span>
													</label>
												</div>						
											</div>
											<div class="choice-item choice-item--mb">
												<div class="choice-item__checkbox checkbox form-group form-group--orange">
													<input type="checkbox" id="chk-orange">
													<label for="chk-orange">
														<span class="choice-item__text">Алтайский край</span>
													</label>
												</div>						
											</div>
											<div class="choice-item choice-item--mb">
												<div class="choice-item__checkbox checkbox form-group form-group--green">
													<input type="checkbox" id="chk-green">
													<label for="chk-green">
														<span class="choice-item__text">Брянская область</span>
													</label>
												</div>						
											</div>										
										</div>
									</div>
								</div>
								<div class="chart__holder chart-pie">
									<div class="chart-pie__top chart-top">										
										<div class="chart-top__select">
											<div class="select-form select-form--height38 select-form-border">												
												<select name="listenersRegion" class="two">
													<option value="1" selected>Москва</option>
													<option value="2">Пункт №1</option>
													<option value="3">Пункт №3</option>
													<option value="4">Пункт №4</option>													
												</select>
											</div>
										</div>
									</div>
									<div class="cart-pie__wr pie-card">
										<div class="pie-card__box">
											<h3 class="pie-card__box-title title3">Посещенные уроки</h3>
											<div class="pie-card__box-text">Всего посещенных уроков</div>
											<div class="pie-card__box-counter">777</div>
											<div class="pie-card__box-counter-percent counter-percent">
												<span class="counter-percent__arrow">
													<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M4 6.66536V1.33203" stroke="#2FD385" stroke-linecap="round" stroke-linejoin="round"/>
														<path d="M2 3.33203L4 1.33203L6 3.33203" stroke="#2FD385" stroke-linecap="round" stroke-linejoin="round"/>
													</svg>														
												</span>
												<span class="counter-percent__number">7,00%</span>
											</div>
											<div class="pie-card__box-canvas">
												<canvas id="myPie1" width="300" height="300"></canvas>
											</div>
										</div>
										<div class="pie-card__box">
											<h3 class="pie-card__box-title title3">Консультации</h3>
											<div class="pie-card__box-text">Всего проведенных консультаций</div>
											<div class="pie-card__box-counter">777</div>
											<div class="pie-card__box-counter-percent counter-percent">
												<span class="counter-percent__arrow">
													<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M4 6.66536V1.33203" stroke="#2FD385" stroke-linecap="round" stroke-linejoin="round"/>
														<path d="M2 3.33203L4 1.33203L6 3.33203" stroke="#2FD385" stroke-linecap="round" stroke-linejoin="round"/>
													</svg>														
												</span>
												<span class="counter-percent__number">7,00%</span>
											</div>
											<div class="pie-card__box-canvas">
												<canvas id="myPie2" width="300" height="300"></canvas>
											</div>
										</div>
										<div class="pie-card__box">
											<h3 class="pie-card__box-title title3">ИОМ</h3>
											<div class="pie-card__box-text">Всего выполненных маршрутов</div>
											<div class="pie-card__box-counter">777</div>
											<div class="pie-card__box-counter-percent counter-percent">
												<span class="counter-percent__arrow">
													<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M4 6.66536V1.33203" stroke="#2FD385" stroke-linecap="round" stroke-linejoin="round"/>
														<path d="M2 3.33203L4 1.33203L6 3.33203" stroke="#2FD385" stroke-linecap="round" stroke-linejoin="round"/>
													</svg>														
												</span>
												<span class="counter-percent__number">7,00%</span>
											</div>
											<div class="pie-card__box-canvas">
												<canvas id="myPie3" width="300" height="300"></canvas>
											</div>
										</div>
									</div>									
								</div>
								<div class="chart__holder chart-bar">
									<div class="chart-bar__top chart-top">
										<h3 class="chart-top__title title3">Методисты</h3>
										<div class="chart-top__select">
											<div class="select-form select-form--height38 select-form-border">												
												<select name="listenersRegion" class="two">
													<option value="1" selected>Среднее образование</option>
													<option value="2">Пункт №1</option>
													<option value="3">Пункт №3</option>
													<option value="4">Пункт №4</option>													
												</select>
											</div>
										</div>
									</div>
									<div class="cart-bar__canvas">
										<canvas id="myBar" width="1140" height="300"></canvas>
									</div>
									<div class="cart-bar__list cart-tip">
										<div class="cart-tip__row">
											<div class="cart-tip__row-num cart-tip__row-num--1">1</div>
											<div class="cart-tip__row-text">Русский язык</div>
										</div>
										<div class="cart-tip__row">
											<div class="cart-tip__row-num cart-tip__row-num--2">2</div>
											<div class="cart-tip__row-text">Русский язык</div>
										</div>
										<div class="cart-tip__row">
											<div class="cart-tip__row-num cart-tip__row-num--3">3</div>
											<div class="cart-tip__row-text">Русский язык</div>
										</div>
										<div class="cart-tip__row">
											<div class="cart-tip__row-num cart-tip__row-num--4">4</div>
											<div class="cart-tip__row-text">Русский язык</div>
										</div>
										<div class="cart-tip__row">
											<div class="cart-tip__row-num cart-tip__row-num--5">5</div>
											<div class="cart-tip__row-text">Русский язык</div>
										</div>
										<div class="cart-tip__row">
											<div class="cart-tip__row-num cart-tip__row-num--6">6</div>
											<div class="cart-tip__row-text">Русский язык</div>
										</div>
										<div class="cart-tip__row">
											<div class="cart-tip__row-num cart-tip__row-num--7">7</div>
											<div class="cart-tip__row-text">Русский язык</div>
										</div>
										<div class="cart-tip__row">
											<div class="cart-tip__row-num cart-tip__row-num--8">8</div>
											<div class="cart-tip__row-text">Русский язык</div>
										</div>
										<div class="cart-tip__row">
											<div class="cart-tip__row-num cart-tip__row-num--9">9</div>
											<div class="cart-tip__row-text">Русский язык</div>
										</div>
										<div class="cart-tip__row">
											<div class="cart-tip__row-num cart-tip__row-num--10">10</div>
											<div class="cart-tip__row-text">Русский язык</div>
										</div>
										<div class="cart-tip__row">
											<div class="cart-tip__row-num cart-tip__row-num--11">11</div>
											<div class="cart-tip__row-text">Русский язык</div>
										</div>
										<div class="cart-tip__row">
											<div class="cart-tip__row-num cart-tip__row-num--12">12</div>
											<div class="cart-tip__row-text">Русский язык</div>
										</div>
										<div class="cart-tip__row">
											<div class="cart-tip__row-num cart-tip__row-num--13">13</div>
											<div class="cart-tip__row-text">Русский язык</div>
										</div>
										<div class="cart-tip__row">
											<div class="cart-tip__row-num cart-tip__row-num--14">14</div>
											<div class="cart-tip__row-text">Русский язык</div>
										</div>
										<div class="cart-tip__row">
											<div class="cart-tip__row-num cart-tip__row-num--15">15</div>
											<div class="cart-tip__row-text">Русский язык</div>
										</div>
										<div class="cart-tip__row">
											<div class="cart-tip__row-num cart-tip__row-num--16">16</div>
											<div class="cart-tip__row-text">Русский язык</div>
										</div>
										<div class="cart-tip__row">
											<div class="cart-tip__row-num cart-tip__row-num--17">17</div>
											<div class="cart-tip__row-text">Русский язык</div>
										</div>
										<div class="cart-tip__row">
											<div class="cart-tip__row-num cart-tip__row-num--18">18</div>
											<div class="cart-tip__row-text">Русский язык</div>
										</div>
									</div>
								</div>
							</div>
                        </div>
                    </div>
                </div>				
											
			</div>		   
		</section>
    </main>
</template>

