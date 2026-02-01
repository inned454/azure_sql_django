from django.contrib import admin
from django.urls import path, include
from api import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/stores/', views.StoreList.as_view()),
    path('api/stores/<int:store_id>/',
         views.StoreDetailUpdateDelete.as_view(), name='store_detail'),
    path('api/stores/deleteAll/', views.StoreDeleteAll.as_view(),
         name='store_delete_all'),
    path('api/products/', views.ProductList.as_view()),
    path('api/products/<int:id>/',views.ProductDetailUpdateDelete.as_view(), name='product_detail'),
    path('api/users/', views.UserList.as_view()),
    path('api/users/<int:user_id>/',views.UserDetailUpdateDelete.as_view(), name='user_detail'),
    path('api/users/deleteAll/', views.UserDeleteAll.as_view(), name='user_delete_all'),
]
