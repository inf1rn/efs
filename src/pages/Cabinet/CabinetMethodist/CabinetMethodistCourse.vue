<template>
    <main class="content content_cabinet">
      <section class="users page__section">
        <!-- <ul class="breadcrumbs page__breadcrumbs">
          <li class="breadcrumbs__item">
            <a href="#" class="breadcrumbs__link">Организации</a>
          </li>
          <li class="breadcrumbs__item">
            <a href="#" class="breadcrumbs__link">Регионы</a>
          </li>
          <li class="breadcrumbs__item">
            <span href="#" class="breadcrumbs__link breadcrumbs__link_current">Республика Адыгея (Адыгея)</span>
          </li>
        </ul> -->
        <div class="users__top">
            <h1 class="section-title">Статистика по курсам</h1>            
        </div>
       
        <div class="users__wrapper wrapper-max_width-m">
            <div class="users__row row-search">
                <input type="text" name="search" class="form__input-edit form__input-edit_type_search" id="search">               
            </div>
			<div class="cabinet-select-wr">
				<div class="form__item form__item--mr80">
					<label for="reportsEducational" class="form__label">Статус</label>
					<select name="reportsEducational" class="two">
						<option value="1" selected>не выбран</option>
						<option value="2">Пункт №2</option>
						<option value="3">Пункт №3</option>
						<option value="4">Пункт №4</option>
					</select>
				</div>
				<div class="form__item form__item--mr55">
					<label for="reportsEducational" class="form__label">Образовательная организация</label>
					<select name="reportsEducational" class="two">
						<option value="1" selected>не выбран</option>
						<option value="2">Пункт №2</option>
						<option value="3">Пункт №3</option>
						<option value="4">Пункт №4</option>
					</select>
				</div>
				<button class="button-form">
					<div class="button-form__img">
						<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M3.53516 10.606L10.6062 3.53489" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M10.6062 10.6057L3.53516 3.53467" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</div>
					сбросить
				</button>
			</div>
			
            <div class="users__row row-table">
                <div class="row-table__top">
                    <div class="row-table__found">
						Найдено: 23
                    </div>                    
                </div>
                <table class="table users__table">
                    <tbody>
						<tr class="table__row table__row_head">
							<th class="table__header">
								<div class="events__filter-item events__filter-item--jc">
								<div class="events__filter-box-arrow box-arrow">
									<div class="arrow arrow-up"><img loading='lazy' width='7' height='5' src='./images/arrow_up.svg' alt='стрелка вверх'></div>
									<div class="arrow arrow-do"><img loading='lazy' width='7' height='5' src='./images/arrow_down.svg' alt='стрелка вниз'></div>
								</div>
								<div class="events__filter-name">Дата</div>
								</div>
							</th>
							<th class="table__header">
								<div class="events__filter-item events__filter-item--jc">
								<div class="events__filter-box-arrow box-arrow">
									<div class="arrow arrow-up"><img loading='lazy' width='7' height='5' src='./images/arrow_up.svg' alt='стрелка вверх'></div>
									<div class="arrow arrow-do"><img loading='lazy' width='7' height='5' src='./images/arrow_down.svg' alt='стрелка вниз'></div>
								</div>
								<div class="events__filter-name">Название курса</div>
								</div>
							</th>
							<th class="table__header">
								<div class="events__filter-item events__filter-item--jc">
								<div class="events__filter-box-arrow box-arrow">
									<div class="arrow arrow-up"><img loading='lazy' width='7' height='5' src='./images/arrow_up.svg' alt='стрелка вверх'></div>
									<div class="arrow arrow-do"><img loading='lazy' width='7' height='5' src='./images/arrow_down.svg' alt='стрелка вниз'></div>
								</div>
								<div class="events__filter-name">Статус</div>
								</div>
							</th>
							<th class="table__header">
								<div class="events__filter-item events__filter-item--jc">
								<div class="events__filter-box-arrow box-arrow">
									<div class="arrow arrow-up"><img loading='lazy' width='7' height='5' src='./images/arrow_up.svg' alt='стрелка вверх'></div>
									<div class="arrow arrow-do"><img loading='lazy' width='7' height='5' src='./images/arrow_down.svg' alt='стрелка вниз'></div>
								</div>
								<div class="events__filter-name">ФИО учителя</div>
								</div>
							</th>
							<th class="table__header">Образовательная организация</th>
							<th class="table__header">Адрес организации</th>														
						</tr>
						<tr class="table__row">
							<td class="table__cell">20.03.2021</td>
							<td class="table__cell">Педагогическое образование: теория и методика преподавания в начальной школе (ФГОС)</td>
							<td class="table__cell">пройден</td>
							<td class="table__cell">Иванова Светлана Геннадьевна</td>
							<td class="table__cell">Московская Академия Дополнительного Образования</td>
							<td class="table__cell">г. Москва, Волжский бульвар дом 3 корпус 1</td>							
						</tr>
						<tr class="table__row">
							<td class="table__cell">20.03.2021</td>
							<td class="table__cell">Педагогическое образование: теория и методика преподавания в начальной школе (ФГОС)</td>
							<td class="table__cell">прохождение</td>
							<td class="table__cell">Кузнецова Ирина Владимировна</td>
							<td class="table__cell">Московская Академия Дополнительного Образования</td>
							<td class="table__cell">г. Москва, Волжский бульвар дом 3 корпус 1</td>							
						</tr>
						<tr class="table__row">
							<td class="table__cell">20.03.2021</td>
							<td class="table__cell">Педагогическое образование: теория и методика преподавания в начальной школе (ФГОС)</td>
							<td class="table__cell">пройден</td>
							<td class="table__cell">Иванова Светлана Геннадьевна</td>
							<td class="table__cell">Московская Академия Дополнительного Образования</td>
							<td class="table__cell">г. Москва, Волжский бульвар дом 3 корпус 1</td>							
						</tr>
						<tr class="table__row">
							<td class="table__cell">20.03.2021</td>
							<td class="table__cell">Педагогическое образование: теория и методика преподавания в начальной школе (ФГОС)</td>
							<td class="table__cell">прохождение</td>
							<td class="table__cell">Кузнецова Ирина Владимировна</td>
							<td class="table__cell">Московская Академия Дополнительного Образования</td>
							<td class="table__cell">г. Москва, Волжский бульвар дом 3 корпус 1</td>							
						</tr>
						<tr class="table__row">
							<td class="table__cell">20.03.2021</td>
							<td class="table__cell">Педагогическое образование: теория и методика преподавания в начальной школе (ФГОС)</td>
							<td class="table__cell">пройден</td>
							<td class="table__cell">Иванова Светлана Геннадьевна</td>
							<td class="table__cell">Московская Академия Дополнительного Образования</td>
							<td class="table__cell">г. Москва, Волжский бульвар дом 3 корпус 1</td>							
						</tr>
						<tr class="table__row">
							<td class="table__cell">20.03.2021</td>
							<td class="table__cell">Педагогическое образование: теория и методика преподавания в начальной школе (ФГОС)</td>
							<td class="table__cell">прохождение</td>
							<td class="table__cell">Кузнецова Ирина Владимировна</td>
							<td class="table__cell">Московская Академия Дополнительного Образования</td>
							<td class="table__cell">г. Москва, Волжский бульвар дом 3 корпус 1</td>							
						</tr>											              
                  	</tbody>
                </table>
				<div class="table-pagination table-pagination_nopadd">
                    <div class="table-pagination__count">
                        1-10 из 1240
                    </div>
                    <div class="table-pagination__bullets">
                        <button class="bullets-left _disabled">
                            <img src="images/table-pagination/left.svg" alt="left">
                        </button>
                        <button class="bullets-right">
                            <img src="images/table-pagination/right.svg" alt="right">
                        </button>
                    </div>
				</div>
            </div>        
      </section>
    </main>
    
</template>