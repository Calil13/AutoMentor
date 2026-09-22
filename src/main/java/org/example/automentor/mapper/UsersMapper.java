package org.example.automentor.mapper;

import org.example.automentor.dto.auth.RegisterFinishDto;
import org.example.automentor.dto.user.UserResponseDtoPrivate;
import org.example.automentor.entity.Users;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UsersMapper {

    UserResponseDtoPrivate toDtoPrivate(Users user);
    //UserResponseDtoPublic toDtoPublic(Users user);
    Users toEntity(RegisterFinishDto finishDto);
}
