﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Server.Data;

#nullable disable

namespace Server.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Server.Models.Account", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("Server.Models.Block", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Blocks");
                });

            modelBuilder.Entity("Server.Models.BlockManagement", b =>
                {
                    b.Property<int>("ManagerId")
                        .HasColumnType("int");

                    b.Property<int>("BlockId")
                        .HasColumnType("int");

                    b.HasKey("ManagerId", "BlockId");

                    b.HasIndex("BlockId");

                    b.ToTable("BlockManagements");
                });

            modelBuilder.Entity("Server.Models.ElectricWaterlog", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ElectricFee")
                        .HasColumnType("int");

                    b.Property<int>("ElectricNew")
                        .HasColumnType("int");

                    b.Property<int>("ElectricOld")
                        .HasColumnType("int");

                    b.Property<int>("ElectricUse")
                        .HasColumnType("int");

                    b.Property<bool>("FeeStatus")
                        .HasColumnType("bit");

                    b.Property<DateTime>("LogDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("RoomId")
                        .HasColumnType("int");

                    b.Property<int>("TotalFee")
                        .HasColumnType("int");

                    b.Property<int>("WaterFee")
                        .HasColumnType("int");

                    b.Property<int>("WaterNew")
                        .HasColumnType("int");

                    b.Property<int>("WaterOld")
                        .HasColumnType("int");

                    b.Property<int>("WaterUse")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RoomId");

                    b.ToTable("ElectricWaterlogs");
                });

            modelBuilder.Entity("Server.Models.Furniture", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("Price")
                        .HasColumnType("real");

                    b.Property<int?>("RepairDetailId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RepairDetailId");

                    b.ToTable("Furnitures");
                });

            modelBuilder.Entity("Server.Models.Manager", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("AccountId")
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Gender")
                        .HasColumnType("bit");

                    b.Property<int>("IdCard")
                        .HasColumnType("int");

                    b.Property<string>("IdentiFyCardNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Status")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("AccountId");

                    b.ToTable("Managers");
                });

            modelBuilder.Entity("Server.Models.RegisterRoom", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DateBegin")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateEnd")
                        .HasColumnType("datetime2");

                    b.Property<int>("DomitoryFee")
                        .HasColumnType("int");

                    b.Property<bool>("DomitoryFeeStatus")
                        .HasColumnType("bit");

                    b.Property<int>("NumberOfMonth")
                        .HasColumnType("int");

                    b.Property<int>("RoomId")
                        .HasColumnType("int");

                    b.Property<bool>("Status")
                        .HasColumnType("bit");

                    b.Property<int>("StudentId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RoomId");

                    b.HasIndex("StudentId");

                    b.ToTable("RegisterRooms");
                });

            modelBuilder.Entity("Server.Models.RepairDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("RepairDate")
                        .HasColumnType("datetime2");

                    b.Property<float>("RepairFee")
                        .HasColumnType("real");

                    b.Property<int?>("RoomId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RoomId");

                    b.ToTable("RepairDetails");
                });

            modelBuilder.Entity("Server.Models.Room", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("BlockId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("RoomTypeId")
                        .HasColumnType("int");

                    b.Property<int>("SlotRemain")
                        .HasColumnType("int");

                    b.Property<bool>("Status")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("BlockId");

                    b.HasIndex("RoomTypeId");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("Server.Models.RoomType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("DomitoryFee")
                        .HasColumnType("int");

                    b.Property<bool>("Furniture")
                        .HasColumnType("bit");

                    b.Property<int>("NumberOfSLot")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("RoomTypes");
                });

            modelBuilder.Entity("Server.Models.Student", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("AccountId")
                        .HasColumnType("int");

                    b.Property<byte[]>("Avartar")
                        .HasColumnType("varbinary(max)");

                    b.Property<DateTime>("BirthDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Ethnic")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Faculty")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Gender")
                        .HasColumnType("bit");

                    b.Property<string>("HomeAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IdentifyCardNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MainAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Major")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nationnality")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RelatedPersonName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RelatedPersonPhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SchoolYear")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Status")
                        .HasColumnType("bit");

                    b.Property<int?>("UniversityId")
                        .HasColumnType("int");

                    b.Property<string>("UniversitysutdentId")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AccountId");

                    b.HasIndex("UniversityId");

                    b.ToTable("Students");
                });

            modelBuilder.Entity("Server.Models.University", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Universities");
                });

            modelBuilder.Entity("Server.Models.BlockManagement", b =>
                {
                    b.HasOne("Server.Models.Block", "Block")
                        .WithMany("BlockManagements")
                        .HasForeignKey("BlockId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Server.Models.Manager", "Manager")
                        .WithMany("BlockManagements")
                        .HasForeignKey("ManagerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Block");

                    b.Navigation("Manager");
                });

            modelBuilder.Entity("Server.Models.ElectricWaterlog", b =>
                {
                    b.HasOne("Server.Models.Room", "Room")
                        .WithMany("ElectricWaterlogs")
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Room");
                });

            modelBuilder.Entity("Server.Models.Furniture", b =>
                {
                    b.HasOne("Server.Models.RepairDetail", "RepairDetail")
                        .WithMany("Furnitures")
                        .HasForeignKey("RepairDetailId");

                    b.Navigation("RepairDetail");
                });

            modelBuilder.Entity("Server.Models.Manager", b =>
                {
                    b.HasOne("Server.Models.Account", "Account")
                        .WithMany()
                        .HasForeignKey("AccountId");

                    b.Navigation("Account");
                });

            modelBuilder.Entity("Server.Models.RegisterRoom", b =>
                {
                    b.HasOne("Server.Models.Room", "Room")
                        .WithMany("RegisterRooms")
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Server.Models.Student", "Student")
                        .WithMany("RegisterRooms")
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Room");

                    b.Navigation("Student");
                });

            modelBuilder.Entity("Server.Models.RepairDetail", b =>
                {
                    b.HasOne("Server.Models.Room", "Room")
                        .WithMany("RepairDetails")
                        .HasForeignKey("RoomId");

                    b.Navigation("Room");
                });

            modelBuilder.Entity("Server.Models.Room", b =>
                {
                    b.HasOne("Server.Models.Block", "Block")
                        .WithMany("Room")
                        .HasForeignKey("BlockId");

                    b.HasOne("Server.Models.RoomType", "RoomType")
                        .WithMany("Rooms")
                        .HasForeignKey("RoomTypeId");

                    b.Navigation("Block");

                    b.Navigation("RoomType");
                });

            modelBuilder.Entity("Server.Models.Student", b =>
                {
                    b.HasOne("Server.Models.Account", "Account")
                        .WithMany()
                        .HasForeignKey("AccountId");

                    b.HasOne("Server.Models.University", "University")
                        .WithMany("Students")
                        .HasForeignKey("UniversityId");

                    b.Navigation("Account");

                    b.Navigation("University");
                });

            modelBuilder.Entity("Server.Models.Block", b =>
                {
                    b.Navigation("BlockManagements");

                    b.Navigation("Room");
                });

            modelBuilder.Entity("Server.Models.Manager", b =>
                {
                    b.Navigation("BlockManagements");
                });

            modelBuilder.Entity("Server.Models.RepairDetail", b =>
                {
                    b.Navigation("Furnitures");
                });

            modelBuilder.Entity("Server.Models.Room", b =>
                {
                    b.Navigation("ElectricWaterlogs");

                    b.Navigation("RegisterRooms");

                    b.Navigation("RepairDetails");
                });

            modelBuilder.Entity("Server.Models.RoomType", b =>
                {
                    b.Navigation("Rooms");
                });

            modelBuilder.Entity("Server.Models.Student", b =>
                {
                    b.Navigation("RegisterRooms");
                });

            modelBuilder.Entity("Server.Models.University", b =>
                {
                    b.Navigation("Students");
                });
#pragma warning restore 612, 618
        }
    }
}
